// import { useState, useEffect } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import DeleteTask from "./DeleteTask";
// import { Link, useNavigate, useOutletContext } from "react-router-dom";
// import { API } from "../api";

// export default function Tasks({ task, fetchTasks, token }) {
//   const navigate = useNavigate();
//   const { user } = useOutletContext();
//   const [completed, setCompleted] = useState(task.completed);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   useEffect(() => {
//     const dueDateTime = new Date(task.dueDate);
//     const currentTime = new Date();

//     const timeUntilDue = dueDateTime - currentTime;
//     const daysUntilDue = Math.floor(timeUntilDue / (1000 * 60 * 60 * 24));
//     const hoursUntilDue = Math.floor(
//       (timeUntilDue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     const minutesUntilDue = Math.floor(
//       (timeUntilDue % (1000 * 60 * 60)) / (1000 * 60)
//     );

//     if (daysUntilDue <= 1) {
//       setShowAlert(true);
//       setAlertMessage(
//         `Task due in ${daysUntilDue} day${daysUntilDue > 1 ? "s" : ""}`
//       );
//     } else if (hoursUntilDue <= 5) {
//       setShowAlert(true);
//       setAlertMessage(
//         `Task due in ${hoursUntilDue} hour${hoursUntilDue > 1 ? "s" : ""}`
//       );
//     } else if (minutesUntilDue < 0) {
//       setShowAlert(true);
//       setAlertMessage(
//         `Task due in ${minutesUntilDue} minute${minutesUntilDue > 1 ? "s" : ""}`
//       );
//     } else {
//       setShowAlert(false);
//     }
//   }, [task.dueDate]);

//   async function handleCheckboxChange(e) {
//     e.preventDefault();
//     setCompleted(!completed);

//     const res = await fetch(`${API}/tasks/${task.id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         completed: !completed,
//       }),
//     });
//     const info = await res.json();

//     await fetchTasks();
//   }

//   const priorityToExclamation = {
//     LOW: "!",
//     MEDIUM: "!!",
//     HIGH: "!!!",
//   };

//   // Get the corresponding exclamation points for the task priority
//   const exclamationPoints = priorityToExclamation[task.priority] || "";

//   // const dueDate = new Date(task.dueDate);
//   // const updatedDueDate = dueDate.toLocaleDateString();

//   const formatDateTime = (dateTime) => {
//     if (!dateTime) return "";

//     const dueDate = new Date(dateTime);
//     const dateOptions = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     };

//     let formattedTime = "";
//     const hours = dueDate.getUTCHours();
//     const minutes = dueDate.getUTCMinutes();

//     // Check if the time is not midnight (00:00)
//     if (hours !== 0 || minutes !== 0) {
//       const timeOptions = {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false, // Display time in 24-hour format
//         timeZone: "UTC", // Assuming the input is in UTC
//       };
//       formattedTime = `, ${dueDate.toLocaleTimeString("en-US", timeOptions)}`;
//     }

//     const formattedDate = dueDate.toLocaleDateString(undefined, dateOptions);

//     return `${formattedDate}${formattedTime}`;
//   };

//   // Inside your component
//   // ...

//   let updatedDueDate = formatDateTime(task.dueDate);

//   return (
//     <div className={`task-container ${showAlert ? "alert" : ""}`} key={task.id}>
//       {showAlert && <div className="alert-message">{alertMessage}</div>}
//       <p>{task.category.name}</p>
//       <p>
//         {exclamationPoints}
//         <span className={completed ? "completed" : ""}>{task.title}</span>
//       </p>
//       <p className="description">{task.description}</p>

//       {task.dueDate && <p className="date">{updatedDueDate}</p>}

//       <div>
//         <div className="checkbox-container">
//           <label className="completed-label">
//             <input
//               type="checkbox"
//               checked={completed}
//               onChange={handleCheckboxChange}
//             />
//             Completed
//           </label>
//         </div>
//         {user.id === task.userId && (
//           <div className="icon-container">
//             <Link to={`/editTasks/${task.id}`}>
//               <button className="icon-buttons">
//                 <FaPencilAlt />
//               </button>
//             </Link>
//             <DeleteTask task={task} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import DeleteTask from "./DeleteTask";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function Tasks({ task, fetchTasks, token }) {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [completed, setCompleted] = useState(task.completed);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const updateAlertMessage = () => {
      const dueDateTime = new Date(task.dueDate);
      const currentTime = new Date();

      const timeUntilDue = dueDateTime - currentTime;
      const daysUntilDue = Math.floor(timeUntilDue / (1000 * 60 * 60 * 24));
      const hoursUntilDue = Math.floor(
        (timeUntilDue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesUntilDue = Math.floor(
        (timeUntilDue % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (completed) {
        setAlertMessage("Task completed");
        setAlertVisible(true);
      } else if (daysUntilDue <= 0) {
        setAlertMessage("Task overdue");
        setAlertVisible(true);
      } else if (daysUntilDue === 1) {
        setAlertMessage(`Task due in ${daysUntilDue} day`);
        setAlertVisible(true);
      } else if (hoursUntilDue <= 5) {
        setAlertMessage(
          `Task due in ${hoursUntilDue} hour${hoursUntilDue > 1 ? "s" : ""}`
        );
        setAlertVisible(true);
      } else {
        setAlertVisible(false);
      }
    };

    // Initial update
    updateAlertMessage();

    // Set up interval to update every hour
    const intervalId = setInterval(updateAlertMessage, 60 * 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [task.dueDate, completed]);

  async function handleCheckboxChange(e) {
    e.preventDefault();
    setCompleted(!completed);

    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });
    const info = await res.json();
    console.log(info);
    await fetchTasks();
  }

  const priorityToExclamation = {
    LOW: "❗",
    MEDIUM: "❗❗",
    HIGH: "❗❗❗",
  };

  // Get the corresponding exclamation points for the task priority
  const exclamationPoints = priorityToExclamation[task.priority] || "";


  const dueDate = new Date(task.dueDate);
  const updatedDueDate = dueDate.toLocaleDateString();


  return (
    <div
      className={`task-container ${alertVisible ? "alert" : ""}`}
      key={task.id}
    >
      {alertVisible && <div className="alert-message">{alertMessage}</div>}
      <p>{task.category.name}</p>
      <p>
        <span id="exclamation">{exclamationPoints}</span>
        <span className={completed ? "completed" : ""}>{task.title}</span>
      </p>
      <p className="description">{task.description}</p>

      {task.dueDate && <p className="date">{updatedDueDate}</p>}

      <div>
        <div className="checkbox-container">
          <label className="completed-label">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleCheckboxChange}
            />
            Completed
          </label>
        </div>
        {user.id === task.userId && (
          <div className="icon-container">
            <Link to={`/editTasks/${task.id}`}>
              <button className="icon-buttons">
                <FaPencilAlt />
              </button>
            </Link>
            <DeleteTask task={task} />
          </div>
        )}
      </div>
    </div>
  );
}
