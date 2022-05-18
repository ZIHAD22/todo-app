import React, { useState } from "react";
import AddTask from "./AddTask";
import AddTaskModal from "./AddTaskModal";

const Home = () => {
  const [addTask, setAddTask] = useState(false);
  return (
    <div>
      <AddTask setAddTask={setAddTask} />
      {addTask && <AddTaskModal setAddTask={setAddTask} />}
    </div>
  );
};

export default Home;
