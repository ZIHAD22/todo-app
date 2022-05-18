import React, { useState } from "react";
import AddTask from "./AddTask";
import AddTaskModal from "./AddTaskModal";
import ViewTaskTable from "./ViewTaskTable";

const Home = () => {
  const [addTask, setAddTask] = useState(false);
  // const [reViewTable, setReViewTable] = useState(false);
  return (
    <div>
      <AddTask setAddTask={setAddTask} />
      <ViewTaskTable addTask={addTask} />
      {addTask && <AddTaskModal setAddTask={setAddTask} />}
    </div>
  );
};

export default Home;
