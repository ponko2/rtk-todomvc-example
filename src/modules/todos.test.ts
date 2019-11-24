import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppDispatch } from 'app/store';
import * as api from 'api/todos';
import {
  TodosState,
  todosReducer,
  updateTodosStart,
  updateTodosSuccess,
  updateTodosFailed,
  fetchTodos,
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodo,
  clearCompleted
} from './todos';

const mockStore = createMockStore<TodosState, AppDispatch>([thunk]);

describe('todosReducer', () => {
  it('should handle initial state', () => {
    expect(
      todosReducer(undefined, {
        type: undefined
      })
    ).toStrictEqual({
      todos: [],
      isLoading: false,
      error: null
    });
  });

  it('should handle updateTodosStart', () => {
    expect(
      todosReducer(
        {
          todos: [],
          isLoading: false,
          error: null
        },
        {
          type: updateTodosStart.type
        }
      )
    ).toStrictEqual({
      todos: [],
      isLoading: true,
      error: null
    });
  });

  it('should handle updateTodosSuccess', () => {
    expect(
      todosReducer(
        {
          todos: [],
          isLoading: false,
          error: null
        },
        {
          type: updateTodosSuccess.type,
          payload: [
            {
              id: 1,
              completed: false,
              text: 'foo'
            }
          ]
        }
      )
    ).toStrictEqual({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });
  });

  it('should handle updateTodosFailed', () => {
    expect(
      todosReducer(
        {
          todos: [],
          isLoading: false,
          error: null
        },
        {
          type: updateTodosFailed.type,
          payload: 'Error: failed'
        }
      )
    ).toStrictEqual({
      todos: [],
      isLoading: false,
      error: 'Error: failed'
    });
  });
});

describe('fetchTodos', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [],
      isLoading: false,
      error: null
    });

    const fetchSpy = jest.spyOn(api, 'fetchTodos').mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ])
    );

    await store.dispatch(fetchTodos());

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ])
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [],
      isLoading: false,
      error: null
    });

    const fetchSpy = jest
      .spyOn(api, 'fetchTodos')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    await store.dispatch(fetchTodos());

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});

describe('addTodo', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [],
      isLoading: false,
      error: null
    });

    const addSpy = jest
      .spyOn(api, 'addTodo')
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest.spyOn(api, 'fetchTodos').mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ])
    );

    await store.dispatch(addTodo('foo'));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ])
    ]);
    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [],
      isLoading: false,
      error: null
    });

    const addSpy = jest
      .spyOn(api, 'addTodo')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const fetchSpy = jest.spyOn(api, 'fetchTodos');

    await store.dispatch(addTodo('foo'));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(addSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe('deleteTodo', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });

    const deleteSpy = jest
      .spyOn(api, 'deleteTodo')
      .mockImplementation(() => Promise.resolve());

    const fetchSpy = jest
      .spyOn(api, 'fetchTodos')
      .mockImplementation(() => Promise.resolve([]));

    await store.dispatch(deleteTodo(1));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([])
    ]);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });

    const deleteSpy = jest
      .spyOn(api, 'deleteTodo')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const fetchSpy = jest.spyOn(api, 'fetchTodos');

    await store.dispatch(deleteTodo(1));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe('editTodo', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });

    const editSpy = jest
      .spyOn(api, 'editTodo')
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest.spyOn(api, 'fetchTodos').mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          completed: false,
          text: 'bar'
        }
      ])
    );

    await store.dispatch(editTodo(1, 'bar'));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([
        {
          id: 1,
          completed: false,
          text: 'bar'
        }
      ])
    ]);
    expect(editSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });

    const editSpy = jest
      .spyOn(api, 'editTodo')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const fetchSpy = jest.spyOn(api, 'fetchTodos');

    await store.dispatch(editTodo(1, 'bar'));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(editSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe('toggleTodo', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });

    const toggleSpy = jest
      .spyOn(api, 'toggleTodo')
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest.spyOn(api, 'fetchTodos').mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          completed: true,
          text: 'foo'
        }
      ])
    );

    await store.dispatch(toggleTodo(1));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([
        {
          id: 1,
          completed: true,
          text: 'foo'
        }
      ])
    ]);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ],
      isLoading: false,
      error: null
    });

    const toggleSpy = jest
      .spyOn(api, 'toggleTodo')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const fetchSpy = jest.spyOn(api, 'fetchTodos');

    await store.dispatch(toggleTodo(1));

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe('toggleAllTodo', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        },
        {
          id: 2,
          completed: false,
          text: 'bar'
        }
      ],
      isLoading: false,
      error: null
    });

    const toggleAllSpy = jest
      .spyOn(api, 'toggleAllTodo')
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest.spyOn(api, 'fetchTodos').mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          completed: true,
          text: 'foo'
        },
        {
          id: 2,
          completed: true,
          text: 'bar'
        }
      ])
    );

    await store.dispatch(toggleAllTodo());

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([
        {
          id: 1,
          completed: true,
          text: 'foo'
        },
        {
          id: 2,
          completed: true,
          text: 'bar'
        }
      ])
    ]);
    expect(toggleAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        },
        {
          id: 2,
          completed: false,
          text: 'bar'
        }
      ],
      isLoading: false,
      error: null
    });

    const toggleAllSpy = jest
      .spyOn(api, 'toggleAllTodo')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const fetchSpy = jest.spyOn(api, 'fetchTodos');

    await store.dispatch(toggleAllTodo());

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(toggleAllSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});

describe('clearCompleted', () => {
  it('success', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        },
        {
          id: 2,
          completed: true,
          text: 'bar'
        }
      ],
      isLoading: false,
      error: null
    });

    const clearCompletedSpy = jest
      .spyOn(api, 'clearCompleted')
      .mockImplementation(() => Promise.resolve(1));

    const fetchSpy = jest.spyOn(api, 'fetchTodos').mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ])
    );

    await store.dispatch(clearCompleted());

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosSuccess([
        {
          id: 1,
          completed: false,
          text: 'foo'
        }
      ])
    ]);
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('failed', async () => {
    const store = mockStore({
      todos: [
        {
          id: 1,
          completed: false,
          text: 'foo'
        },
        {
          id: 2,
          completed: true,
          text: 'bar'
        }
      ],
      isLoading: false,
      error: null
    });

    const clearCompletedSpy = jest
      .spyOn(api, 'clearCompleted')
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const fetchSpy = jest.spyOn(api, 'fetchTodos');

    await store.dispatch(clearCompleted());

    expect(store.getActions()).toStrictEqual([
      updateTodosStart(),
      updateTodosFailed('Error: failed')
    ]);
    expect(clearCompletedSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });
});
