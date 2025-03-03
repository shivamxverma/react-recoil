// src/App.jsx
import { RecoilRoot, useRecoilValue, useSetRecoilState,useRecoilState, atom } from "recoil";
import React from "react";


const task = atom({
  key : "task",
  default : ""
})

const todosAtom = atom({
  key: "todos",
  default: [],
});

const filterTodoSelector = atom({
  key: "filterTodo",
  get : ({get})=>{
    const filter = get(task);
    const list = get(todosAtom);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
  }}
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
  const [todo, setTodo] = useRecoilState(task);

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
  const filter = useSetRecoilState(filterTodoSelector);
  console.log(filter);

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