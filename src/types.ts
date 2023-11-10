export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  date_limit?: string;
};

export type TodoListType = {
  id: number;
  name: string;
  createdAt: string;
  todos: TodoType[];
};
