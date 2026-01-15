import React, { useEffect, useState } from "react";
import { useTodos, Todo } from "../hooks/useTodos";

const Dashboard: React.FC = () => {
  const {
    todos,
    loading,
    page,
    totalPages,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTodos(1);
  }, [fetchTodos]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo(title, description);
    setTitle("");
    setDescription("");
    setIsAdding(false);
  };

  const handleStatusUpdate = async (todo: Todo) => {
    const newStatus = todo.status === "pending" ? "completed" : "pending";
    await updateTodo(todo._id, { status: newStatus });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isAdding ? "Cancel" : "Add New Todo"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-6">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Todo
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div className={todo.status === "completed" ? "opacity-50" : ""}>
                <h3
                  className={`font-bold text-lg ${
                    todo.status === "completed" ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="text-gray-600">{todo.description}</p>
                <span
                  className={`text-sm ${
                    todo.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {todo.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(todo)}
                  className="text-sm bg-gray-200 px-2 py-1 rounded"
                >
                  {todo.status === "pending" ? "Mark Done" : "Undo"}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => fetchTodos(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Type Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => fetchTodos(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
