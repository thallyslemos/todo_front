"use client";
import { EditIcon, TrashIcon } from "@/app/assets/icons";
import { Todo } from "@/types";
import calcTimeAgo from "@/utils/calcTimeAgo";
import {
  Alert,
  Checkbox,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useLayoutEffect } from "react";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [checked, setChecked] = React.useState(todo.completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = { ...todo, completed: e.target.checked };
    // chamar put da api
    console.log(newTodo);
    setChecked(e.target.checked);
  };

  const expired = (dateLimit: string) => {
    const date = new Date(dateLimit);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const value = diff > 0 ? false : true;
    return value;
  };

  return (
    <Alert className="relative flex flex-col bg-white/50 text-primary shadow-md justify-between backdrop-blur-sm">
      <Typography
        variant="h6"
        className={`${checked ? "line-through" : ""} text-secondary `}
      >
        <Checkbox
          crossOrigin={undefined}
          color="green"
          className=""
          checked={checked}
          value={checked ? "true" : "false"}
          onChange={handleChange}
          size={1}
        />
        {todo.title}
      </Typography>
      <Typography variant="small" className=" leading-none text-primary h-full">
        {todo.description}
      </Typography>
      {todo.dateLimit && !checked && (
        <Typography
          variant="small"
          className={`${expired(todo.dateLimit) ? "text-red-500" : ""} mt-1`}
        >
          {expired(todo.dateLimit) ? "Expirado " : "Expira "}
          {calcTimeAgo(todo.dateLimit)}
        </Typography>
      )}

      <div className="absolute flex flex-col gap-2 top-2 right-4">
        <IconButton color="white" size="sm" className="text-red-500 ">
          <TrashIcon />
        </IconButton>
        <IconButton color="white" size="sm" className="text-yellow-500">
          <EditIcon />
        </IconButton>
      </div>
    </Alert>
  );
};
export default TodoItem;
