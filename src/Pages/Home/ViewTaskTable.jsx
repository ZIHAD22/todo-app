import axios from "../../utility/axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const ViewTaskTable = ({ addTask }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [viewsGenerat, setViewsGenerat] = useState(true);
  let sNo = 1;

  useEffect(() => {
    axios
      .get(`getAllTask?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data: allTask }) => {
        setTasks(allTask);
        setViewsGenerat(true);
      })
      .catch((e) => {
        if (e.response.status === 401 || e.response.status === 403) {
          signOut(auth);
          navigate("/signIn");
        }
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
      {tasks.length !== 0 ? (
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
              <tr key={task._id} className="text-center">
                <th>{sNo++}</th>
                <td>
                  {!task.completed ? task.taskName : <s>{task.taskName}</s>}
                </td>
                <td>
                  {!task.completed ? (
                    task.taskDescription.slice(0, 90) + " ..."
                  ) : (
                    <s>{task.taskDescription.slice(0, 90) + " ..."}</s>
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
      ) : (
        <>
          <h1 className="text-4xl text-center mt-20">Please Create Task </h1>
          <span className="text-info text-2xl text-center block mt-5">
            No Task Found
          </span>
        </>
      )}
    </div>
  );
};

export default ViewTaskTable;
