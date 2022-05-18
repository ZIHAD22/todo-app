const AddTask = ({ setAddTask }) => {
  return (
    <div>
      <div className="text-center my-5">
        <label
          htmlFor="add-task-modal"
          onClick={() => setAddTask(true)}
          className="btn btn-outline btn-info uppercase"
        >
          add a task
        </label>
      </div>
    </div>
  );
};

export default AddTask;
