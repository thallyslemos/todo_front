"use client";

import TodoForm from "@/components/TodoForm";
import CustomCard from "@/components/CustomCard";
import Toast from "@/components/Toast";
import TodoItem from "@/components/TodoItem";
import { TodoListType, TodoType } from "@/types";
import { del, get, put } from "@/utils/fetchApi";
import {
  CardBody,
  IconButton,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GoBackIcon } from "@/app/assets/icons";

export default function TodoPage({ params }: { params: { id: string } }) {
  const [todoList, setTodoList] = useState<TodoListType>();
  const [loading, setLoading] = useState(true);
  const [toastData, setToastData] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const { id } = params;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get(`/todo_lists/${id}`);
      setTodoList(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    del(`/todos/${id}`)
      .then(async (res) => {
        if (res) {
          setToastData({
            message: "Tarefa deletada com sucesso",
            type: "success",
          });
          await fetchData();
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar tarefa:", error);
      });
    setShowToast(false);
    setTimeout(() => setShowToast(true), 0);
  };

  const handleUpdate = (data: TodoType) => {
    put(`/todos/${data.id}`, data).then((res) => {
      if (res.status === 200) {
        // fetchData();
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen-main flex py-10 justify-center">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          interval={5000}
          onClose={() => setShowToast(false)}
        />
      )}
      <CustomCard title={todoList?.name || "Carregando..."}>
        <div className="flex gap-2 justify-center">
          <Link href="/todo" className="mx-auto mt-2">
            <Tooltip color="deep-orange" content="Voltar">
              <IconButton size="sm" variant="outlined">
                <GoBackIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <TodoForm onSubmit={fetchData} listId={todoList?.id || Number(id)} />
        </div>
        {loading && (
          <div className="py-10">
            <Spinner color="deep-orange" className="m-auto" />
          </div>
        )}
        {!loading && (
          <CardBody className="overflow-y-auto max-h-full">
            <section className="flex flex-col my-3 gap-2 ">
              {todoList?.todos.map((todo, index) => (
                <TodoItem
                  onDelete={handleDelete}
                  checkChange={handleUpdate}
                  onUpdate={fetchData}
                  key={index}
                  todo={todo}
                />
              ))}
            </section>
          </CardBody>
        )}
      </CustomCard>
    </main>
  );
}
