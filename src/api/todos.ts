import Dexie from "dexie";
import type { Todo } from "../models/todos";

type TodoRecord = {
  id?: number;
  title: string;
  completed: 0 | 1;
};

class TodoAppDatabase extends Dexie {
  todos: Dexie.Table<TodoRecord, number>;

  constructor() {
    super("TodoAppDatabase");

    this.version(1).stores({
      todos: "++id, title, completed",
    });

    this.todos = this.table("todos");
  }
}

const db = new TodoAppDatabase();

function convert2todo(record: TodoRecord): Todo {
  const { completed, ...rest } = record;
  return { completed: !!completed, ...rest } as Todo;
}

export async function fetchTodos(): Promise<Todo[]> {
  return (await db.todos.toArray()).map(convert2todo);
}

export async function addTodo(title: string): Promise<void> {
  await db.todos.add({ title, completed: 0 });
}

export async function deleteTodo(id: number): Promise<void> {
  await db.todos.delete(id);
}

export async function editTodo({
  id,
  title,
}: Omit<Todo, "completed">): Promise<void> {
  await db.todos.update(id, { title });
}

export async function toggleTodo(id: number): Promise<void> {
  const todo = await db.todos.get(id);
  if (!todo) {
    throw new Error("Data not found");
  }
  await db.todos.update(id, { completed: Number(!todo.completed) });
}

export async function toggleAllTodo(): Promise<void> {
  const todos = await db.todos.toArray();
  const areAllMarked = todos.every((todo) => todo.completed);
  await db.todos
    .where("completed")
    .equals(Number(areAllMarked))
    .modify({ completed: Number(!areAllMarked) });
}

export async function clearCompleted(): Promise<void> {
  await db.todos.where("completed").equals(1).delete();
}
