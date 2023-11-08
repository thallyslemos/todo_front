"use client";

import TodoList from "@/components/TodoList";
import { todoLists } from "@/utils/Constatnts";

export default function TodoPage({ params }: { params: { id: string } }) {
  const list = todoLists.find(
    (todoList) => todoList.id.toString() === params.id
  );

  return (
    <main className="min-h-screen-main flex justify-center">
      <TodoList list={list!} />
    </main>
  );
}
