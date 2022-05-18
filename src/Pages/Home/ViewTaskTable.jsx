import axios from "../../utility/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewTaskTable = ({ addTask }) => {
  const [tasks, setTasks] = useState([]);
  const [viewsGenerat, setViewsGenerat] = useState(true);
  let sNo = 1;

  useEffect(() => {
    axios.get("getAllTask").then(({ data: allTask }) => {
      setTasks(allTask);
      setViewsGenerat(true);
    });
  }, [viewsGenerat, addTask]);

  const handleTaskDelete = async (id) => {
    const url = `taskDelete?id=${id}`;
    const { data: taskDeleted } = await axios.delete(url);
    if (taskDeleted) {
      toast.success("Task Delete");
      setViewsGenerat(false);
    }
  };

  const handleComplete = async (id) => {
    const url = `taskComplete?id=${id}`;
    const { data: taskCompleted } = await axios.get(url);
    if (taskCompleted) {
      toast.success("Task Complete");
      setViewsGenerat(false);
    }
  };
  return (
    <div className="overflow-x-auto m-3">
      <table className="table w-full">
        <thead>
          <tr className="text-center">
            <th>S.no</th>
            <th>Name</th>
            <th>Description</th>
            <th>acton</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <th>{sNo++}</th>
              <td>
                {!task.completed ? task.taskName : <s>{task.taskName}</s>}
              </td>
              <td>
                {!task.completed ? (
                  task.taskDescription
                ) : (
                  <s>{task.taskDescription}</s>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleComplete(task._id)}
                  className="btn btn-success"
                >
                  Completed
                </button>
                <button
                  onClick={() => handleTaskDelete(task._id)}
                  className="btn btn-error mx-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTaskTable;
