import { useState } from "react";
import { X, Pencil, Plus, CheckCheck } from "lucide-react";

export const TodoList = () => {
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editTaskInput, setEditTaskInput] = useState("");

  function addTask() {
    if (inputTask.trim() !== "" && isEditing === null) {
      setTaskList([...taskList, inputTask]);
      setInputTask("");
    }
  }

  function removeTask(indexToRemove) {
    setTaskList(taskList.filter((task, index) => index !== indexToRemove));
  }

  function editTask(indexToEdit) {
    setIsEditing(indexToEdit);
    setEditTaskInput(taskList[indexToEdit]);
  }

  function saveTask(indexToSave) {
    if (editTaskInput.trim() !== "") {
      const updateList = [...taskList];
      updateList[indexToSave] = editTaskInput;
      setTaskList(updateList);
      setEditTaskInput("");
      setIsEditing(null);
    }
  }
  return (
    <div className="bg-purple-400/70 w-[350px] md:w-2/4 pb-5 rounded-lg shadow-md mt-10">
      <h1 className="text-4xl pb-5 text-center mt-5">ToDo List</h1>
      <div className="flex mx-4">
        <input
          onChange={(e) => setInputTask(e.target.value)}
          type="text"
          value={inputTask}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="Add task"
          className="p-1 w-full"
        ></input>
        <button className="px-3 bg-lime-300 ml-3 p-1" onClick={addTask}>
          <Plus />
        </button>
      </div>

      <div className="w-full">
        <ul className="mt-4 mx-4">
          {taskList.map((task, index) => (
            <li
              key={index}
              className="flex justify-between capitalize mb-3 break-all"
            >
              {isEditing === index ? (
                <input
                  type="text"
                  value={editTaskInput}
                  onChange={(e) => setEditTaskInput(e.target.value)}
                  className="p-1 w-4/5"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveTask(index);
                    }
                  }}
                ></input>
              ) : (
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    className="min-w-4 h-5 accent-lime-300"
                  ></input>

                  {task}
                </div>
              )}

              <div className="flex gap-3 ml-1">
                {isEditing === index ? (
                  <button
                    className="px-3 bg-lime-300"
                    onClick={() => saveTask(index)}
                  >
                    <CheckCheck />
                  </button>
                ) : (
                  <button
                    className="px-3 bg-lime-300 py-1 max-h-8"
                    onClick={() => editTask(index)}
                  >
                    <Pencil />
                  </button>
                )}

                <button
                  className="px-3 bg-lime-300 max-h-8"
                  onClick={() => removeTask(index)}
                >
                  <X />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
