"use client";

import CreateListForm from "@/components/CreateListForm";
import { todoLists } from "@/utils/Constatnts";
import Link from "next/link";

export default function TodoPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen-main flex justify-center">
      <CreateListForm />
      {todoLists.map((todoList, index) => (
        <Link href={`/todo/${todoList.id}`} key={index}>
          {todoList.name}
        </Link>
      ))}
    </main>
  );
}
