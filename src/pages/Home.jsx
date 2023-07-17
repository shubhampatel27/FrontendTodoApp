import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import TodoItem from "../component/TodoItem";
import { Context, server } from "../main";

const Home = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);
  const [taksA, setTaskA] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated} = useContext(Context)
  if(!isAuthenticated) return <Navigate to={"/login"}/>




  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setTaskLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/task/newTask`,
        {
          title: task,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setTaskLoading(false);

      setTask("");
      setDescription("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setTaskLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/task/myTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTaskA(res.data.tasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler} action="">
            <input
              type="text"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={taskLoading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {taksA.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
