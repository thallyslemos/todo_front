"use client";
import React, { useState, ChangeEvent, useContext } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
  Textarea,
  Tooltip,
} from "@material-tailwind/react";
import { AddIcon, EditIcon } from "@/app/assets/icons";
import { post, put } from "@/utils/fetchApi";
import { TodoType } from "@/types";
import { ToastContext } from "./ToastProvider";

type CreateTodoFormProps = {
  onSubmit: () => void;
  listId?: number;
  todo?: TodoType;
};

const TodoForm = ({ onSubmit, listId, todo }: CreateTodoFormProps) => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error("TodoForm must be used within a ToastProvider");
  }

  const { setToastData, setShowToast } = toastContext;

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    completed: todo?.completed || false,
    description: todo?.description || "",
    date_limit: todo?.date_limit
      ? new Date(todo.date_limit).toISOString().slice(0, 16)
      : "",
    todo_list_id: listId,
  });

  const handleOpen = () => setOpenDialog(!openDialog);
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const OpenButton = todo ? (
    <IconButton
      color="white"
      size="sm"
      className="text-yellow-500"
      onClick={handleOpen}
    >
      <EditIcon />
    </IconButton>
  ) : (
    <IconButton
      color="green"
      variant="outlined"
      size="sm"
      onClick={handleOpen}
      className="mx-auto mt-2"
    >
      <AddIcon />
    </IconButton>
  );

  const clearForm = () => {
    setFormData({
      title: "",
      completed: false,
      description: "",
      date_limit: "",
      todo_list_id: listId,
    });
  };

  const handleCancel = () => {
    clearForm();
    setOpenDialog(!openDialog);
  };

  const handleSubmit = () => {
    const method = todo ? put : post;
    const path = todo ? `/todos/${todo.id}` : "/todos";
    method(path, formData)
      .then((res) => {
        if (res instanceof Error) {
          let errorMessage = res.message;
          try {
            const errorObject = JSON.parse(errorMessage);
            if (errorObject.title && errorObject.title[0]) {
              errorMessage = errorObject.title[0];
            }
          } catch (e) {
            console.error(e);
          }
          setToastData({ message: errorMessage, type: "error" });
        } else if (res?.status === 201 || res?.status === 200) {
          todo
            ? setToastData({
                message: "Item atualizado com sucesso",
                type: "success",
              })
            : setToastData({
                message: "Item criado com sucesso",
                type: "success",
              });

          onSubmit();
        }
      })
      .finally(() => {
        setTimeout(() => setShowToast(true), 0);
        setOpenDialog(false);
        clearForm();
      });
  };

  return (
    <>
      <Tooltip content={todo ? "Editar Item" : "Criar Item"}>
        {OpenButton}
      </Tooltip>
      <Dialog
        size="xs"
        open={openDialog}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto y-10 w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-primary">
              Novo Item
            </Typography>
            <Typography className="text-primary" variant="h6">
              Título da Item
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Título"
              size="lg"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Typography className="text-primary" variant="h6">
              Descrição do Item
            </Typography>
            <Textarea
              label="Descrição"
              size="lg"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Typography className="text-primary" variant="h6">
              Data limite
            </Typography>
            <Input
              crossOrigin={undefined}
              type="datetime-local"
              label="Data limite"
              size="lg"
              name="date_limit"
              value={formData.date_limit}
              onChange={handleChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex gap-2">
              <Button
                color="green"
                variant="gradient"
                onClick={handleSubmit}
                fullWidth
              >
                Salvar
              </Button>
              <Button
                color="red"
                variant="gradient"
                onClick={handleCancel}
                fullWidth
              >
                Cancelar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
export default TodoForm;
