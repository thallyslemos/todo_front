"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import Toast from "./Toast";
import { AddIcon } from "@/app/assets/icons";
import { post } from "@/utils/fetchApi";

const CreateListForm = ({ onCreate }: { onCreate: () => void }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [listName, setListName] = useState("");
  const [toastData, setToastData] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const handleOpen = () => setOpenDialog(!openDialog);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setListName(e.target.value);

  const handleCreate = () => {
    setShowToast(false);
    post("/todo_lists", { name: listName })
      .then((res) => {
        if (res instanceof Error) {
          let errorMessage = res.message;
          try {
            const errorObject = JSON.parse(errorMessage);
            if (errorObject.name && errorObject.name[0]) {
              errorMessage = errorObject.name[0];
            }
          } catch (e) {
            console.error(e);
          }
          setToastData({ message: errorMessage, type: "error" });
        } else if (res?.status === 201) {
          setToastData({
            message: "Lista criada com sucesso",
            type: "success",
          });
          onCreate();
        }
      })
      .finally(() => {
        setTimeout(() => setShowToast(true), 0), setOpenDialog(false);
        setListName("");
      });
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          interval={5000}
          onClose={() => setShowToast(false)}
        />
      )}
      <IconButton
        color="green"
        variant="outlined"
        size="sm"
        onClick={handleOpen}
        className="mx-auto mt-2"
      >
        <AddIcon />
      </IconButton>
      <Dialog
        size="xs"
        open={openDialog}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto y-10 w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-primary">
              Nova Lista
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
                onClick={handleCreate}
                fullWidth
              >
                Criar
              </Button>
              <Button
                color="red"
                variant="gradient"
                onClick={handleOpen}
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
export default CreateListForm;
