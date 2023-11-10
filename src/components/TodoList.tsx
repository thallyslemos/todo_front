"use client";
import { CardBody, CardFooter, IconButton } from "@material-tailwind/react";
import TodoItem from "./TodoItem";
import React from "react";
import { TodoList } from "@/types";
import CustomCard from "./CustomCard";
import { AddIcon, TrashIcon } from "@/app/assets/icons";

type TodoListProps = {
  list: TodoList;
};

const TodoList = ({ list }: TodoListProps) => {
  const [open, setOpen] = React.useState(true);

  const { todos } = list;
  const handleOpen = () => setOpen(!open);

  return (
    <CustomCard title={list.name}>
      <CardBody className="overflow-y-auto max-h-full">
        <section className="flex flex-col my-3 gap-2 ">
          {todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))}
        </section>
      </CardBody>
      <CardFooter className="pt-0 flex gap-2">
        <IconButton size="sm" color="green">
          <AddIcon />
        </IconButton>
        <IconButton size="sm" color="red">
          <TrashIcon />
        </IconButton>
      </CardFooter>
    </CustomCard>
  );
};
export default TodoList;
