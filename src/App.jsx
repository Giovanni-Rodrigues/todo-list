import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar javascript",
      description: "Estudar para me tornar um programador",
      isCompleted: false,
    },

    {
      id: 2,
      title: "Estudar inglês",
      description: "Estudar para me tornar um programador",
      isCompleted: false,
    },

    {
      id: 3,
      title: "Estudar html",
      description: "Estudar para me tornar um programador",
      isCompleted: false,
    },
  ]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)) || [];
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setTasks(data);
    }

    fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((tasks) => {
      if (tasks.id === taskId) {
        return { ...tasks, isCompleted: !tasks.isCompleted };
      }

      return tasks;
    });

    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), //gerar IDs aleatórios
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
