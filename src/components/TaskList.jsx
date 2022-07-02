import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../redux/slices/taskSlice.js";
import { Link } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    //console.log(id);
  };

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Tasks N° {tasks.length}</h1>
        <Link
          to="/create-task"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Create Task
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md self-center"
                >
                  edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                >
                  delete
                </button>
              </div>
            </header>
            <p>{task.description}</p>
            <p className="text-xs text-slate-400">{task.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
