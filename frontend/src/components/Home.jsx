import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Loader from "./Loader";
import Checkbox from "@mui/joy/Checkbox";

import Modal from "@mui/material/Modal";
import AddModel from "./AddModel";
import EditModel from "./EditModel";

function Home() {
  const [time, setTime] = useState("Good Morning!");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addTodo, setAddTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);

  const handleOpen = () => setAddTodo(true);
  const handleClose = () => setAddTodo(false);

  /* const handleUpdateOpen = () => setEditTodo(true);
  const handleUpdateClose = () => setEditTodo(false); */

  useEffect(() => {
    const interval = setInterval(fetchTodo, 20000); // Polling every 20 seconds
    return () => clearInterval(interval); // Cleanup
    const initialEditTodos = {};
    todos.forEach((todo) => {
      initialEditTodos[todo._id] = false;
    });
    setEditTodo(initialEditTodos);
  }, [todos]);

  const handleUpdateOpen = (id) => {
    setEditTodo((prevEditTodos) => ({
      ...prevEditTodos,
      [id]: true,
    }));
  };

  const handleUpdateClose = (id) => {
    setEditTodo((prevEditTodos) => ({
      ...prevEditTodos,
      [id]: false,
    }));
  };

  const [filter, setFilter] = useState("active");

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      setTime("Good Morning!");
    } else {
      setTime("Good Afternoon!");
    }
  });

  const fetchTodo = () => {
    axios
      .get("http://localhost:3000/todo")
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTodo();
    const interval = setInterval(fetchTodo, 1000); // Polling every 1 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const updateTodos = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const activationHandler = (id) => {
    setLoading(true);
    axios
      .put(`http://localhost:3000/todo/active/${id}`)
      .then(() => {
        setLoading(false);
        fetchTodo();
      })
      .catch((err) => {
        alert("System has following Errors: " + err);
      });
  };

  const selectHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="mx-[20rem] mt-[3rem]">
      <div className="font-bold text-[2rem]">Hello Yasith, {time}👋</div>
      <div className="font-bold text-[1.5rem]">{currentDate}</div>

      <div className="w-full flex items-center justify-between mt-5">
        <div className="flex gap-x-4 items-center">
          <div className="flex items-center border-2 border-black p-2 rounded-xl">
            <input
              type="text"
              placeholder="Search Task"
              className="w-[35rem] h-[2rem] focus:outline-none"
            />
            <button className="w-[2rem] h-[2rem] flex items-center justify-center bg-black text-white p-1 rounded-lg">
              <IoIosSearch />
            </button>
          </div>

          <button
            className=" bg-black text-white w-[2.5rem] h-[2.5rem] p-2 rounded-full flex items-center justify-center"
            onClick={handleOpen}
          >
            <FaPlus />
          </button>

          {/* test code*/}
          <Modal
            open={addTodo}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddModel updateTodos={updateTodos} handleClose={handleClose} />
          </Modal>
          {/* test code*/}
        </div>

        <select
          className="border-2 border-black p-3 w-[10rem] rounded-xl"
          onChange={selectHandler}
        >
          <option value="complete">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Loader />
          </div>
        ) : (
          <div>
            {todos

              .filter((item) =>
                filter === "active" ? item.isActive : !item.isActive
              )
              .map((item, index) => (
                <div>
                  <div className="flex w-full p-3 justify-between items-center bg-black text-white rounded-xl my-3 cursor-pointer">
                    <Checkbox
                      size="lg"
                      variant="solid"
                      onChange={() => activationHandler(item._id)}
                    />

                    <div
                      className="flex flex-col items-center"
                      key={item._id}
                      onClick={() => handleUpdateOpen(item._id)}
                    >
                      <h1 className="font-bold text-[1rem] text-left">
                        {item.title}
                      </h1>
                      <p className="font-thin text-[0.9rem]">
                        {item.description}
                      </p>
                    </div>

                    <h1
                      key={item._id}
                      onClick={() => handleUpdateOpen(item._id)}
                    >
                      {new Date(item.todoDate).toLocaleDateString()}
                    </h1>
                  </div>
                  <Modal
                    open={editTodo[item._id]}
                    onClose={() => handleUpdateClose(item._id)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <EditModel
                      handleUpdateClose={() => handleUpdateClose(item._id)}
                      itemKey={item._id}
                    />
                  </Modal>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
