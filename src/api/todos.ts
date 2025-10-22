import localforage from "localforage";

const todoUrl = "https://dummyjson.com/todos";
const STORAGE_KEY = "cached_todos";

export interface Todo {
  id: number | string;
  todo: string;
  completed: boolean;
  userId: number;
  __temp?: boolean;
}

/* -------------------- FETCH ALL TODOS -------------------- */
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const cached = await localforage.getItem<Todo[]>(STORAGE_KEY);
    if (cached && cached.length > 0) return cached;
  } catch (err) {
    console.warn("Cache read failed, refetching from API...", err);
  }

  const res = await fetch(todoUrl);
  if (!res.ok) throw new Error("Error fetching todos");

  const data: { todos: Todo[] } = await res.json();
  await localforage.setItem(STORAGE_KEY, data.todos);
  return data.todos;
};

/* -------------------- FETCH SINGLE TODO -------------------- */
export const fetchTodosById = async (id: number | string): Promise<Todo> => {
  const res = await fetch(`${todoUrl}/${id}`);
  if (!res.ok) throw new Error("Error fetching todo by ID");
  return res.json();
};

/* -------------------- CREATE NEW TODO -------------------- */
export const createTodo = async (newTodo: Omit<Todo, "id">): Promise<Todo> => {
  const res = await fetch(`${todoUrl}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) throw new Error("Error creating todo");

  const created: Todo = await res.json();
  const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];

  // Tag new todos as temporary since DummyJSON doesn’t persist them
  const finalCreated: Todo = { ...created, __temp: true };
  const updated = [finalCreated, ...existing];
  await localforage.setItem(STORAGE_KEY, updated);

  return finalCreated;
};

/* -------------------- DELETE TODO -------------------- */
export const deleteTodo = async (
  id: number | string
): Promise<{ isDeleted: boolean }> => {
  try {
    const res = await fetch(`${todoUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error deleting todo");

    const result: { isDeleted: boolean } = await res.json();

    // Always update local cache manually
    const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];
    const updated = existing.filter((todo) => todo.id !== id);
    await localforage.setItem(STORAGE_KEY, updated);

    return result;
  } catch (err) {
    console.error("API delete failed, removing locally only:", err);
    const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];
    const updated = existing.filter((todo) => todo.id !== id);
    await localforage.setItem(STORAGE_KEY, updated);
    return { isDeleted: true };
  }
};

/* -------------------- UPDATE TODO -------------------- */
export const updateTodo = async (
  id: number | string,
  updatedData: Partial<Todo>
): Promise<Todo> => {
  const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];
  const todo = existing.find((t) => t.id === id);

  // Update local temporary todos
  if (todo?.__temp) {
    const updatedList = existing.map((t) =>
      t.id === id ? { ...t, ...updatedData } : t
    );
    await localforage.setItem(STORAGE_KEY, updatedList);
    return { ...todo, ...updatedData };
  }

  // Otherwise update via API
  const res = await fetch(`${todoUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Error updating todo");

  const updated: Todo = await res.json();
  const updatedList = existing.map((t) =>
    t.id === id ? { ...t, ...updated } : t
  );
  await localforage.setItem(STORAGE_KEY, updatedList);

  return updated;
};

/* -------------------- CLEAR ALL LOCAL TODOS -------------------- */
export const clearTodoCache = async (): Promise<void> => {
  try {
    await localforage.removeItem(STORAGE_KEY);
    console.log("🧹 Local todo cache cleared!");
  } catch (err) {
    console.error("Failed to clear local cache:", err);
  }
};
