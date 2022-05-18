import axios from "../../utility/axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddTaskModal = ({ setAddTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddTask = async (data) => {
    const { data: addTaskData } = await axios.post("addTask", data);
    if (addTaskData) {
      toast.success("Task Added");
    }
    reset();
    setAddTask(false);
  };

  return (
    <div>
      <input type="checkbox" id="add-task-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="add-task-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(handleAddTask)}>
            <div className="my-3">
              <input
                type="text"
                placeholder="Task Name"
                {...register("taskName", { required: "required" })}
                className="input input-bordered input-info w-full lg:max-w-lg"
              />
              {errors && (
                <p className="text-red-600">{errors?.taskName?.message}</p>
              )}
            </div>
            <div>
              <textarea
                {...register("taskDescription", { required: "required" })}
                className="textarea textarea-info w-full"
                placeholder="Task Description"
              ></textarea>
              {errors && (
                <p className="text-red-600">
                  {errors?.taskDescription?.message}
                </p>
              )}
            </div>
            <div className="modal-action">
              <button
                htmlFor="add-task-modal"
                type="submit"
                className="btn uppercase"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
