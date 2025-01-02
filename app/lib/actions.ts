"use server"

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    author_id: formData.get('author_id'),
    content: formData.get('content'),
  };
  try {
  //const data = await sql`
  await sql`
    INSERT INTO "Post" (title, content, published, author_id)
    VALUES (${rawFormData.title?.toString()}, ${rawFormData.content?.toString()}, TRUE, ${rawFormData.author_id?.toString()})
  `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create Post data.');
  }

  revalidatePath('/home');
  redirect('/home');
}

export async function editPost(post_id: string, formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    author_id: formData.get('author_id'),
    content: formData.get('content'),
  };
  try {
  //const data = await sql`
  await sql`
    UPDATE "Post"
    SET "title" = ${rawFormData.title?.toString()}, "content" = ${rawFormData.content?.toString()}, "published" = TRUE
    WHERE "post_id" = ${`${post_id}`};
  `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to edit Post data.');
  }

  revalidatePath('/home');
  redirect('/home');
}