"use client";
import React from "react";
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

const CreateListForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <IconButton onClick={handleOpen}>Novo</IconButton>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Nova Lista
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Título da Lista
            </Typography>
            <Input crossOrigin label="Tírulo" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex gap-2">
              {" "}
              <Button variant="gradient" onClick={handleOpen} fullWidth>
                Criar
              </Button>
              <Button variant="gradient" onClick={handleOpen} fullWidth>
                cancelar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
export default CreateListForm;
