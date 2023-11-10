"use client";

import CustomCard from "@/components/CustomCard";
import CreateListForm from "@/components/CreateListForm";
import {
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import { Eye, TrashIcon } from "../assets/icons";
import { useEffect, useState } from "react";
import { del, get } from "@/utils/fetchApi";
import Toast from "@/components/Toast";
import { TodoListType } from "@/types";

export default function TodoPage({ params }: { params: { slug: string } }) {
  const [lists, setList] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastData, setToastData] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get(`/todo_lists`);
      setList(response);
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
    <main className="min-h-screen-main flex justify-center py-10">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          interval={5000}
          onClose={() => setShowToast(false)}
        />
      )}
      <CustomCard title="Minhas Listas">
        {loading && (
          <div className="py-10">
            <Spinner color="deep-orange" className="m-auto" />
          </div>
        )}
        {!loading && (
          <>
            <CreateListForm onCreate={fetchData} />
            <List>
              {lists.map((todoList, index) => (
                <ListItem key={index}>
                  {todoList.name}
                  <ListItemSuffix className="flex gap-2">
                    <Link href={`/todo/${todoList.id}`}>
                      <IconButton size="sm" variant="text" color="blue">
                        <Eye />
                      </IconButton>
                    </Link>
                    <IconButton
                      size="sm"
                      variant="text"
                      color="red"
                      onClick={() => handleDelete(todoList.id)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CustomCard>
    </main>
  );
}