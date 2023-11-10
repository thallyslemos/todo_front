"use client";
import { TrashIcon } from "@/app/assets/icons";
import { TodoType } from "@/types";
import calcTimeAgo from "@/utils/calcTimeAgo";
import {
  Alert,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import TodoForm from "./TodoForm";

type TodoItemProps = {
  todo: TodoType;
  onDelete: (id: number) => void;
  checkChange: (data: TodoType) => void;
  onUpdate: () => void;
};

const TodoItem = ({ todo, onDelete, checkChange, onUpdate }: TodoItemProps) => {
  const [checked, setChecked] = React.useState(todo.completed);
  const [currentTodo, setCurrentTodo] = React.useState(todo);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = { ...currentTodo, completed: e.target.checked };
    setCurrentTodo(newTodo);
    setChecked(e.target.checked);
    checkChange(newTodo);
  };

  const expired = (date_limit: string) => {
    const date = new Date(date_limit);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const value = diff > 0 ? false : true;
    return value;
  };

  return (
    <Alert className="min-h-[88px] relative flex flex-col bg-white/50 text-primary shadow-md justify-between backdrop-blur-sm">
      {todo && (
        <>
          <Typography
            variant="h6"
            className={`${checked ? "line-through" : ""} text-primary `}
          >
            <Checkbox
              crossOrigin={undefined}
              color="blue"
              className=""
              checked={checked}
              value={checked ? "true" : "false"}
              onChange={handleCheck}
              // disabled={checked}
              size={1}
            />
            {todo.title}
          </Typography>
          <Typography
            variant="small"
            className=" leading-none text-primary h-full"
          >
            {todo.description}
          </Typography>
          {todo.date_limit && !checked && (
            <Typography
              variant="small"
              className={`${
                expired(todo.date_limit) ? "text-red-500" : ""
              } mt-2 underline`}
            >
              {expired(todo.date_limit) ? "Expirado " : "Expira "}
              {calcTimeAgo(todo.date_limit)}
            </Typography>
          )}

          <div className="absolute flex flex-col gap-2 top-2 right-4">
            <Tooltip content="Deletar item">
              <IconButton
                color="white"
                size="sm"
                className="text-red-500 "
                onClick={() => onDelete(todo.id)}
              >
                <TrashIcon />
              </IconButton>
            </Tooltip>
            <TodoForm todo={todo} onSubmit={onUpdate} />
          </div>
        </>
      )}
    </Alert>
  );
};
export default TodoItem;
