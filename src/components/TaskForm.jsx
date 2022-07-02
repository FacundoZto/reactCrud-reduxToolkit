import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addTasks, updateTask } from "../redux/slices/taskSlice.js";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (params.id) {
      let taskToEdit = tasks.find((task) => {
        return task.id === params.id;
      });

      setTask(taskToEdit);
    }
  }, [params.id, tasks]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!params.id) {
      dispatch(
        addTasks({
          ...task,
          id: uuid(),
        })
      );
    } else {
      dispatch(updateTask(task));
    }

    navigate("/");
  };

  return (
    <div>
      {params.id ? <h1>Edit Task</h1> : <h1>Create Task</h1>}
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
        <label className="block text-sm font-bold">Task:</label>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        />
        <label>
          Description:
          <textarea
            type="text"
            name="description"
            placeholder="description"
            onChange={handleChange}
            value={task.description}
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          />
        </label>
        <button type="submit" className="bg-indigo-600 px-2 py-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
