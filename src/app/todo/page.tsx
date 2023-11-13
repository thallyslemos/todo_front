"use client";

import CustomCard from "@/components/CustomCard";
import {
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
import { Eye, TrashIcon } from "../assets/icons";
import { useEffect, useState } from "react";
import { del, get } from "@/utils/fetchApi";
import { TodoListType } from "@/types";
import ListForm from "@/components/ListForm";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";

export default function TodoPage({ params }: { params: { slug: string } }) {
  const [lists, setList] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState(true);
  const { setToastData, setShowToast, isLogged } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (!isLogged()) {
      setToastData({
        message: "Você precisa estar logado para acessar essa página",
        type: "error",
      });
      router.push("/");
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get(`/todo_lists`);
      setList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    del(`/todo_lists/${id}`)
      .then(async (res) => {
        if (res) {
          setToastData({
            message: "Lista deletada com sucesso",
            type: "success",
          });
          await fetchData();
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar lista:", error);
      });
    setShowToast(false);
    setTimeout(() => setShowToast(true), 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen-main flex justify-center py-10 px-2">
      {isLogged() && (
        <CustomCard title="Minhas Listas">
          {loading && (
            <div className="py-10">
              <Spinner color="deep-orange" className="m-auto" />
            </div>
          )}
          {!loading && (
            <>
              <ListForm onSubmit={fetchData} />
              <List>
                {lists.map((todoList, index) => (
                  <ListItem key={index}>
                    {todoList.name}
                    <ListItemSuffix className="flex gap-2">
                      <Tooltip content="Ver lista">
                        <Link href={`/todo/${todoList.id}`}>
                          <IconButton size="sm" variant="text" color="blue">
                            <Eye />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <ListForm list={todoList} onSubmit={fetchData} />
                      <Tooltip content="Deletar lista">
                        <IconButton
                          size="sm"
                          variant="text"
                          color="red"
                          onClick={() => handleDelete(todoList.id)}
                        >
                          <TrashIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSuffix>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </CustomCard>
      )}
    </main>
  );
}
