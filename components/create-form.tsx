'use client';

import Link from 'next/link';
import styles from '@/app/utils/post.module.css';
import { createPost } from '@/app/lib/actions';
import { useFormStatus } from 'react-dom';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="rounded-xl border-2 border-indigo-500 p-2 m-2" type="submit" disabled={pending}>
      {pending ? "Confirming..." : "Confirm"}
    </button>
  );
}

export default function CreateForm({ value }: { value: any}) {

  return (
  <>

    <div className={`${styles.eachPostLayout}`}>
      <form action={createPost}>
        <div className="m-2">
          <label>Title</label>
          <input name="title" className="rounded-md w-full border-2 border-indigo-500 p-1" required></input>
        </div>
        <div className="m-5">
          <input name="author_id" type="hidden" defaultValue={value} className="w-full m-2 border-2 border-indigo-500"></input>
        </div>
        <div className="m-2">
          <label>Content</label>
          <textarea name="content" className="rounded-lg w-full h-64 md:h-96 border-2 border-indigo-500 p-1" required></textarea>
        </div>
        <div className="flex justify-between">
          <Link className="rounded-xl border-2 border-indigo-500 p-2 m-2 w-20 text-center" href="/home">Cancel</Link>
          <Submit />
        </div>
      </form>
    </div>
    
  </>
  );
}
