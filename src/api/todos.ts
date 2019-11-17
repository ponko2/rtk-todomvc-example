import Dexie from 'dexie';

export interface Todo {
  id: number;
  completed: boolean;
  text: string;
}

interface TodoRecord {
  id?: number;
  completed: 0 | 1;
  text: string;
}

class TodoAppDatabase extends Dexie {
  todos: Dexie.Table<TodoRecord, number>;

  constructor() {
    super('TodoAppDatabase');

    this.version(1).stores({
      todos: '++id, completed, text'
    });

    this.todos = this.table('todos');
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

export async function addTodo(text: string) {
  return db.todos.add({ completed: 0, text });
}

export async function deleteTodo(id: number) {
  return db.todos.delete(id);
}

export async function editTodo(id: number, text: string) {
  return db.todos.update(id, { text });
}

export async function toggleTodo(id: number) {
  const todo = await db.todos.get(id);
  if (!todo) {
    throw new Error('Data not found');
  }
  return db.todos.update(id, { completed: Number(!todo.completed) });
}

export async function toggleAllTodo() {
  const todos = await db.todos.toArray();
  const areAllMarked = todos.every(todo => todo.completed);
  return db.todos
    .where('completed')
    .equals(Number(areAllMarked))
    .modify({ completed: Number(!areAllMarked) });
}

export async function clearCompleted() {
  return db.todos
    .where('completed')
    .equals(1)
    .delete();
}
