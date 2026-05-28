import { useState } from "react";
import './styles/Todo.css';

function Todo() {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const today = new Date();

    const [inputTask, setInputTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask() {
        if (inputTask.trim() === "") {
            console.warn("Please enter a task.");
            return;
        }

        if (tasks.length >= 7) {
            console.warn("Maximum of 7 tasks.");
            return;
        }

        const newTask = {
            text: inputTask,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setInputTask("");
    }

    function toggleTask(index) {
        const updatedTasks = [...tasks];

        updatedTasks[index].completed =
            !updatedTasks[index].completed;

        setTasks(updatedTasks);
    }

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const progress =
        tasks.length === 0
            ? 0
            : (completedTasks / tasks.length) * 100;

    const [showPopup, setShowPopup] = useState(false);
    function openPopup() {
      setShowPopup(true)
    }

    function closePopup() {
      setShowPopup(false)
    }

    return (
        <div className="todo">
            <div className="top-section">
                <div className="datetime">
                    <span id="day">
                        {weekday[today.getDay()].toLowerCase()}
                    </span>

                    <span id="number">
                        {today.getDate()}
                    </span>
                    
                    <span id="month">
                        {monthNames[today.getMonth()].toLowerCase()}
                    </span>

                </div>

                <div className="right-section">
                    <div className="progression">
                        <h3>progress</h3>

                        <progress
                            id="progress-bar"
                            value={progress}
                            max="100"
                        />
                    </div>

                    <div className="add-task">
                        <input
                            type="text"
                            placeholder="Write your task here..."
                            value={inputTask}
                            onChange={(e) =>
                                setInputTask(e.target.value)
                            }
                        />

                        <button className="add-btn" onClick={addTask}>
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="bottom-section">
              <h3>to do:</h3>
                {tasks.map((task, index) => (
                    <p key={index}>
                        <i className="bx bxs-leaf"></i>

                        <span
                            onClick={() =>
                                toggleTask(index)
                            }
                            className={
                                task.completed
                                    ? "done checked"
                                    : ""
                            }
                        >
                            {task.text}
                        </span>
                    </p>
                ))}
            </div>
            <button id="finish-btn" onClick={openPopup}>
                FINISH DAY
            </button>
            <div className={showPopup ? "popup open-popup" : "popup"}>
              <h2>Congratulations!</h2>
              <p>You have completed {tasks.length} tasks</p>
              <button onClick={closePopup}>OK</button>
            </div>
        </div>
    );
}

export default Todo;