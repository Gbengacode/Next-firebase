import React, { useContext, useState } from "react";
import Link from "next/link";
import { TaskContext } from "../contexts/TaskContext";
import { ACTIONS } from "../actions/taskActions";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Task = () => {
  const { taskState, dispatch } = useContext(TaskContext);
  const [task, setTask] = useState("");
  const collectionRef = collection(db, "tasks");
  const handleDelete = (id) => {
    dispatch({ type: ACTIONS.DELETETASK, payload: id });
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collectionRef, { name: task });
      dispatch({type: ACTIONS.ADDTASK, payload: { name: task }})
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <form
        className=" flex justify-center items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="form-group flex flex-row">
          <input
            type="text"
            className="p-2 outline-none focus:border-gray-500"
            placeholder="testing"
            onChange={handleChange}
            value={task}
          />
          <input
            type="submit"
            onClick={handleSubmit}
            className="p-4 cursor-pointer bg-white border border-solid  text-slate-800 w-full"
          />
        </div>
      </form>

      <div className="flex justify-center items-center mt-20">
        <table className="border-collapse   border border-slate-400 bg-white">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {taskState.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>
                  <button
                    className="border border-solid border-slate-800 p-2 rounded"
                    onClick={() => {
                      handleDelete(task.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link href={`/dashboard/${task.id}`}>
                    <button className="border border-solid border-slate-800 ml-3 mr-3 p-2 rounded">
                      EDIT
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Task;
