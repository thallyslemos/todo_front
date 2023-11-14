"use client";

import { TodoListType, TodoType } from "@/types";
import { del, get, put } from "@/utils/fetchApi";
import {
  CardBody,
  IconButton,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState, useCallback, useContext } from "react";
import Link from "next/link";
import { GoBackIcon } from "@/app/assets/icons";
import { useGlobalContext } from "@/context/store";
import CustomCard from "@/components/CustomCard";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { useRouter } from "next/navigation";

export default function TodoPage({ params }: { params: { id: string } }) {
  const [todoList, setTodoList] = useState<TodoListType>();
  const [loading, setLoading] = useState(true);
  const { setToastData, setShowToast, isLoggedIn } = useGlobalContext();

  const { id } = params;

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      setToastData({
        message: "Você precisa estar logado para acessar essa página",
        type: "error",
      });
      router.push("/");
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    }
  }, [isLoggedIn, router, setToastData, setShowToast]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await get(`/todo_lists/${id}`);
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleDelete = useCallback(
    (id: number) => {
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
    },
    [fetchData, setToastData, setShowToast]
  );

  const handleUpdate = useCallback((data: TodoType) => {
    put(`/todos/${data.id}`, data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="min-h-screen-main flex py-10 px-2 justify-center">
      {isLoggedIn && (
        <CustomCard title={todoList?.name || "Carregando..."}>
          <div className="flex gap-2 justify-center">
            <Link href="/todo" className="mx-auto mt-2">
              <Tooltip color="deep-orange" content="Voltar">
                <IconButton
                  size="sm"
                  variant="outlined"
                  className="border border-secondary text-secondary shadow-sm"
                >
                  <GoBackIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <TodoForm
              onSubmit={fetchData}
              listId={todoList?.id || Number(id)}
            />
          </div>
          {loading && (
            <div className="py-10">
              <Spinner color="deep-orange" className="m-auto" />
            </div>
          )}
          {!loading && (
            <CardBody className="overflow-y-auto max-h-full">
              <section className="flex flex-col my-3 gap-2 ">
                {todoList &&
                  todoList?.todos.map((todo, index) => (
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
      )}
    </main>
  );
}
