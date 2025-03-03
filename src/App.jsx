// src/App.jsx
import { RecoilRoot, useRecoilValue, useSetRecoilState, atom } from "recoil";
import React, { useState } from "react";

const todosAtom = atom({
  key: "todos",
  default: [],
});

// Filter selector (optional, showing completed todos as an example)
const filterTodoSelector = atom({
  key: "filterTodo",
  get : ({get})=>{
    const todo = get(todosAtom);
    
  }
});

function App() {
  return (
    <RecoilRoot>
      <div>
        <h1>Todo App</h1>
        <AddTodo />
        <FilterTodo />
      </div>
    </RecoilRoot>
  );
}

function AddTodo() {
  const setTodos = useSetRecoilState(todosAtom);
  const [todo, setTodo] = useState("");

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a todo"
      />
      <button
        onClick={() => {
          if (todo.trim()) {
            const newTodo = {
              text: todo,
              isDone: false,
            };
            setTodos((prev) => [...prev, newTodo]);
            setTodo("");
          }
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

function FilterTodo() {
  const todos = useRecoilValue(todosAtom);
  const setTodos = useSetRecoilState(todosAtom);

  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.text}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => {
                      setTodos((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, isDone: !item.isDone } : item
                        )
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;