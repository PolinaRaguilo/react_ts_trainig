import React from "react";
import { useState } from "react";
import ToDo from "./../models/todo";

type TodoContextObj = {
  items: ToDo[];
  addTodo: (newTodo: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodoContextObj>({
  items: [],
  addTodo: (newTodo: string) => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<{ children: any }> = (props) => {
  const [todoItems, setTodoItems] = useState<ToDo[]>([]);

  const AddToDoHandler = (newTodo: string) => {
    setTodoItems([new ToDo(newTodo), ...todoItems]);
  };

  const RemoveTodoHandler = (todoId: string) => {
    const newItems = todoItems.filter((item) => item.id !== todoId);
    setTodoItems(newItems);
  };

  const contextValue: TodoContextObj = {
    items: todoItems,
    addTodo: AddToDoHandler,
    removeTodo: RemoveTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;