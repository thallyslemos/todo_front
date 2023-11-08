"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import TodoItem from "./TodoItem";
import React from "react";
import { Todo, TodoList } from "@/types";

type TodoListProps = {
  list: TodoList;
};

const TodoList = ({ list }: TodoListProps) => {
  const [open, setOpen] = React.useState(true);

  const {todos} = list
  const handleOpen = () => setOpen(!open);

  return (
    <Card className="mt-6 w-96 h-fit pt-2 my-auto shadow-lg bg-blue-gray-50">
      <CardHeader className="justify-center text-white bg-primary text-secondary">
        <Typography variant="h5" className="text-center">
          {list.name}
        </Typography>{" "}
      </CardHeader>
      <CardBody className="overflow-y-auto max-h-full">
        <section className="flex flex-col my-3 gap-2 ">
          {todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </section>
      </CardBody>
      <CardFooter className="pt-0 flex gap-2">
        <IconButton size="sm" color="green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </IconButton>
        <IconButton size="sm" color="red">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </IconButton>
      </CardFooter>
    </Card>
  );
};
export default TodoList;
