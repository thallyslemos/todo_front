"use client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import TodoItem from "./TodoItem";
import React from "react";

const todos = [
  {
    id: 1,
    title: "teste",
    completed: true,
    description: "testando todolist e todo itemns testando todolist e todo itemns testando todolist e todo itemns",
    dateLimit: "2023-10-10",
  },
  {
    id: 2,
    title: "teste",
    completed: true,
    description: "testando todolist e todo itemns",
    dateLimit: "2023-12-10",

  },
  {
    id: 3,
    title: "teste",
    completed: true,
    description: "testando todolist e todo itemns",
  },
];

const TodoList = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Card className="mt-6 w-96 h-fit pt-2">
      <CardHeader className="">
        <Accordion open={open}>
          <AccordionHeader
            onClick={() => handleOpen()}
            className="justify-center text-secondary hover:text-primary hover:bg-secondary"
          >
            <Typography variant="h5" className="text-center">
              TODO
            </Typography>{" "}
          </AccordionHeader>
          <AccordionBody className="bg-white">
            <Typography className=" text-primary px-2">
              The place is close to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </Typography>
          </AccordionBody>
        </Accordion>
      </CardHeader>
      <CardBody className="overflow-y-auto max-h-full">
        <section className="flex flex-col my-3 gap-2 ">
          {todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </section>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
};
export default TodoList;
