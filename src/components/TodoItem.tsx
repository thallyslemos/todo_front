"use client";
import { Todo } from "@/types";
import calcTimeAgo from "@/utils/CalcTimeAgo";
import { Alert, Checkbox, Typography } from "@material-tailwind/react";
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
    <Alert
      className="bg-white border border-secondary text-primary shadow-md justify-between"
      action={
        <Checkbox
          crossOrigin={undefined}
          color="green"
          className=""
          checked={checked}
          value={checked ? "true" : "false"}
          onChange={handleChange}
          size={1}
        />
      }
    >
      <section className="flex flex-col">
        <Typography
          variant="h6"
          className={`${checked ? "line-through" : ""} text-primary`}
        >
          {todo.title}
        </Typography>
        <Typography
          variant="small"
          className=" leading-none text-primary h-full"
        >
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
      </section>
    </Alert>
  );
};
export default TodoItem;
