import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as api from "../api/todos";
import { AppDispatch } from "../app/store";
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  editTodo,
  fetchTodos,
  todosReducer,
  TodoState,
  toggleAllTodo,
  toggleTodo,
} from "./todos";

const mockStore = createMockStore<TodoState, AppDispatch>([thunk]);

describe("todosReducer", () => {
  it("should handle initial state", () => {
    expect(
      todosReducer(undefined, {
        type: undefined,
      })
    ).toStrictEqual({
      ids: [],
      entities: {},
      isLoading: false,
      error: null,
    });
  });

  describe.each([
    ["todos/fetch", fetchTodos],
    ["todos/add", addTodo],
    ["todos/delete", deleteTodo],
    ["todos/edit", editTodo],
    ["todos/toggle", toggleTodo],
    ["todos/toggleAll", toggleAllTodo],
    ["todos/clearCompleted", clearCompleted],
  ])("%p", (name, actionCreator) => {
    it("pending", () => {
      expect(
        todosReducer(
          {
            ids: [],
            entities: {},
            isLoading: false,
            error: null,
          },
          {
            type: actionCreator.pending.type,
          }
        )
      ).toStrictEqual({
        ids: [],
        entities: {},
        isLoading: true,
        error: null,
      });
    });
    it("fulfilled", () => {
      expect(
        todosReducer(
          {
            ids: [],
            entities: {},
            isLoading: false,
            error: null,
          },
          {
            type: actionCreator.fulfilled.type,
            payload: [{ id: 1, completed: false, text: "foo" }],
          }
        )
      ).toStrictEqual({
        ids: [1],
        entities: {
          1: { id: 1, completed: false, text: "foo" },
        },
        isLoading: false,
        error: null,
      });
    });
    it("rejected", () => {
      expect(
        todosReducer(
          {
            ids: [],
            entities: {},
            isLoading: false,
            error: null,
          },
          {
            type: actionCreator.rejected.type,
            error: {
              toString() {
                return "failed";
              },
            },
          }
        )
      ).toStrictEqual({
        ids: [],
        entities: {},
        isLoading: false,
        error: "failed",
      });
    });
  });
});

describe("fetchTodos", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [],
      entities: {},
      isLoading: false,
      error: null,
    });

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, completed: false, text: "foo" }])
      );

    await store.dispatch(fetchTodos());

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: undefined,
        },
        payload: undefined,
        type: "todos/fetch/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: undefined,
        },
        payload: [{ id: 1, completed: false, text: "foo" }],
        type: "todos/fetch/fulfilled",
      },
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [],
      entities: {},
      isLoading: false,
      error: null,
    });

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    await store.dispatch(fetchTodos());

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: undefined,
        },
        payload: undefined,
        type: "todos/fetch/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: undefined,
          aborted: false,
          condition: false,
        },
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        payload: undefined,
        type: "todos/fetch/rejected",
      },
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});

describe("addTodo", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [],
      entities: {},
      isLoading: false,
      error: null,
    });

    const addSpy = jest
      .spyOn(api, "addTodo")
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, completed: false, text: "foo" }])
      );

    await store.dispatch(addTodo("foo"));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: "foo",
        },
        payload: undefined,
        type: "todos/add/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: "foo",
        },
        payload: [{ id: 1, completed: false, text: "foo" }],
        type: "todos/add/fulfilled",
      },
    ]);
    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [],
      entities: {},
      isLoading: false,
      error: null,
    });

    const addSpy = jest
      .spyOn(api, "addTodo")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    const fetchSpy = jest.spyOn(api, "fetchTodos");

    await store.dispatch(addTodo("foo"));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: "foo",
        },
        payload: undefined,
        type: "todos/add/pending",
      },
      {
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: "foo",
          aborted: false,
          condition: false,
        },
        payload: undefined,
        type: "todos/add/rejected",
      },
    ]);
    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe("deleteTodo", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [1],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
      },
      isLoading: false,
      error: null,
    });

    const deleteSpy = jest
      .spyOn(api, "deleteTodo")
      .mockImplementation(() => Promise.resolve());

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() => Promise.resolve([]));

    await store.dispatch(deleteTodo(1));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: 1,
        },
        payload: undefined,
        type: "todos/delete/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: 1,
        },
        payload: [],
        type: "todos/delete/fulfilled",
      },
    ]);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [1],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
      },
      isLoading: false,
      error: null,
    });

    const deleteSpy = jest
      .spyOn(api, "deleteTodo")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    const fetchSpy = jest.spyOn(api, "fetchTodos");

    await store.dispatch(deleteTodo(1));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: 1,
        },
        payload: undefined,
        type: "todos/delete/pending",
      },
      {
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: 1,
          aborted: false,
          condition: false,
        },
        payload: undefined,
        type: "todos/delete/rejected",
      },
    ]);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe("editTodo", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [1],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
      },
      isLoading: false,
      error: null,
    });

    const editSpy = jest
      .spyOn(api, "editTodo")
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, completed: false, text: "bar" }])
      );

    await store.dispatch(editTodo({ id: 1, text: "bar" }));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: { id: 1, text: "bar" },
        },
        payload: undefined,
        type: "todos/edit/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: { id: 1, text: "bar" },
        },
        payload: [{ id: 1, completed: false, text: "bar" }],
        type: "todos/edit/fulfilled",
      },
    ]);
    expect(editSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [1],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
      },
      isLoading: false,
      error: null,
    });

    const editSpy = jest
      .spyOn(api, "editTodo")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    const fetchSpy = jest.spyOn(api, "fetchTodos");

    await store.dispatch(editTodo({ id: 1, text: "bar" }));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: { id: 1, text: "bar" },
        },
        payload: undefined,
        type: "todos/edit/pending",
      },
      {
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: { id: 1, text: "bar" },
          aborted: false,
          condition: false,
        },
        payload: undefined,
        type: "todos/edit/rejected",
      },
    ]);
    expect(editSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe("toggleTodo", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [1],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
      },
      isLoading: false,
      error: null,
    });

    const toggleSpy = jest
      .spyOn(api, "toggleTodo")
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, completed: true, text: "foo" }])
      );

    await store.dispatch(toggleTodo(1));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: 1,
        },
        payload: undefined,
        type: "todos/toggle/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: 1,
        },
        payload: [{ id: 1, completed: true, text: "foo" }],
        type: "todos/toggle/fulfilled",
      },
    ]);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [1],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
      },
      isLoading: false,
      error: null,
    });

    const toggleSpy = jest
      .spyOn(api, "toggleTodo")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    const fetchSpy = jest.spyOn(api, "fetchTodos");

    await store.dispatch(toggleTodo(1));

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: 1,
        },
        payload: undefined,
        type: "todos/toggle/pending",
      },
      {
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: 1,
          aborted: false,
          condition: false,
        },
        payload: undefined,
        type: "todos/toggle/rejected",
      },
    ]);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe("toggleAllTodo", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [1, 2],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
        2: { id: 2, completed: true, text: "bar" },
      },
      isLoading: false,
      error: null,
    });

    const toggleAllSpy = jest
      .spyOn(api, "toggleAllTodo")
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest.spyOn(api, "fetchTodos").mockImplementation(() =>
      Promise.resolve([
        { id: 1, completed: true, text: "foo" },
        { id: 2, completed: true, text: "bar" },
      ])
    );

    await store.dispatch(toggleAllTodo());

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: undefined,
        },
        payload: undefined,
        type: "todos/toggleAll/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: undefined,
        },
        payload: [
          { id: 1, completed: true, text: "foo" },
          { id: 2, completed: true, text: "bar" },
        ],
        type: "todos/toggleAll/fulfilled",
      },
    ]);
    expect(toggleAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [1, 2],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
        2: { id: 2, completed: false, text: "bar" },
      },
      isLoading: false,
      error: null,
    });

    const toggleAllSpy = jest
      .spyOn(api, "toggleAllTodo")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    const fetchSpy = jest.spyOn(api, "fetchTodos");

    await store.dispatch(toggleAllTodo());

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: undefined,
        },
        payload: undefined,
        type: "todos/toggleAll/pending",
      },
      {
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: undefined,
          aborted: false,
          condition: false,
        },
        payload: undefined,
        type: "todos/toggleAll/rejected",
      },
    ]);
    expect(toggleAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe("clearCompleted", () => {
  it("success", async () => {
    const store = mockStore({
      ids: [1, 2],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
        2: { id: 2, completed: true, text: "bar" },
      },
      isLoading: false,
      error: null,
    });

    const clearCompletedSpy = jest
      .spyOn(api, "clearCompleted")
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest
      .spyOn(api, "fetchTodos")
      .mockImplementation(() =>
        Promise.resolve([{ id: 1, completed: false, text: "foo" }])
      );

    await store.dispatch(clearCompleted());

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: undefined,
        },
        payload: undefined,
        type: "todos/clearCompleted/pending",
      },
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "fulfilled",
          arg: undefined,
        },
        payload: [{ id: 1, completed: false, text: "foo" }],
        type: "todos/clearCompleted/fulfilled",
      },
    ]);
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("failed", async () => {
    const store = mockStore({
      ids: [1, 2],
      entities: {
        1: { id: 1, completed: false, text: "foo" },
        2: { id: 2, completed: true, text: "bar" },
      },
      isLoading: false,
      error: null,
    });

    const clearCompletedSpy = jest
      .spyOn(api, "clearCompleted")
      .mockImplementation(() => Promise.reject(new Error("failed")));

    const fetchSpy = jest.spyOn(api, "fetchTodos");

    await store.dispatch(clearCompleted());

    expect(store.getActions()).toStrictEqual([
      {
        meta: {
          requestId: expect.anything(),
          requestStatus: "pending",
          arg: undefined,
        },
        payload: undefined,
        type: "todos/clearCompleted/pending",
      },
      {
        error: {
          message: "failed",
          name: "Error",
          stack: expect.anything(),
        },
        meta: {
          requestId: expect.anything(),
          rejectedWithValue: false,
          requestStatus: "rejected",
          arg: undefined,
          aborted: false,
          condition: false,
        },
        payload: undefined,
        type: "todos/clearCompleted/rejected",
      },
    ]);
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});
