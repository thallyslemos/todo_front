export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  dateLimit?: string;
};

export type TodoList = {
  id: number;
  name: string;
  createdAt: string;
  todos: Todo[];
};
