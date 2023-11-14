"use client";
import { useState, ChangeEvent } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { AddIcon, EditIcon } from "@/app/assets/icons";
import { post, put } from "@/utils/fetchApi";
import { useGlobalContext } from "@/context/store";
import { TodoListType } from "@/types";

type ListFormProps = {
  onSubmit: () => void;
  list?: TodoListType;
};

const ListForm = ({ onSubmit, list }: ListFormProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [listName, setListName] = useState(list?.name || "");
  const { setToastData, setShowToast } = useGlobalContext();

  const handleOpen = () => setOpenDialog(!openDialog);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setListName(e.target.value);

  const handleCancel = () => {
    setListName(list?.name || "");
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const method = list ? put : post;
    const path = list ? `/todo_lists/${list.id}` : "/todo_lists";
    method(path, { name: listName })
      .then((res) => {
        if (res instanceof Error) {
          let errorMessage = res.message;
          try {
            const errorObject = JSON.parse(errorMessage);
            if (errorObject.error) {
              errorMessage = errorObject.error;
            }
            if (errorObject.name) {
              errorMessage = errorObject.name;
            }
          } catch (e) {
            console.error(e);
          }
          setToastData({ message: errorMessage, type: "error" });
        } else if (res?.status === 201 || res?.status === 200) {
          list
            ? setToastData({
                message: "Lista atualizada com sucesso",
                type: "success",
              })
            : setToastData({
                message: "Lista criada com sucesso",
                type: "success",
              });

          onSubmit();
        }
      })
      .finally(() => {
        setTimeout(() => setShowToast(true), 0);
        setOpenDialog(false);
        setListName("");
      });
  };

  const OpenButton = list ? (
    <IconButton
      variant="text"
      color="yellow"
      size="sm"
      className="text-yellow-700"
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

  return (
    <>
      <Tooltip content={list ? "Editar lista" : "Criar lista"}>
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
              {list ? "Editar Lista" : "Nova Lista"}
            </Typography>
            <Typography className="text-primary" variant="h6">
              Título da Lista
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Título"
              size="lg"
              value={listName}
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
                {list ? "Atualizar" : "Criar"}
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
export default ListForm;
