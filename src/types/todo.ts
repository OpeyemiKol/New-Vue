export interface Todo {
  id: number | string;
  todo: string;
  completed: boolean;

  // Optional flags for optimistic UI
  __temp?: boolean;
  isOptimistic?: boolean;
}
