import type { Action } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { todosReducer } from "../modules/todos";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
