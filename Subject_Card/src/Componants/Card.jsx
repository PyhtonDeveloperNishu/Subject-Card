import styles from "./Card.module.css";
import { useState, useEffect } from "react";

const Card = () => {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  const [planner, setPlanner] = useState([]);

  // Retrieve the planner data from localStorage when the component mounts
  useEffect(() => {
    const plannerData = localStorage.getItem("planner");
    if (plannerData) {
      console.log("Planner data found in localStorage");
      setPlanner(JSON.parse(plannerData));
    }
  }, []); // Only run once on mount

  // Add subject and hours when the "Add" button is clicked
  const handleAddClick = (e) => {
    e.preventDefault();
    const obj = {
      subject: subject,
      hours: hours,
    };
    const plannerArray = [...planner, obj];
    setPlanner(plannerArray);
    localStorage.setItem("planner", JSON.stringify(plannerArray));
    setSubject("");
    setHours("");
  };

  // + Button to increment hours
  const handlePlusBtn = (index) => {
    const plannerCopy = [...planner];
    const updatedObj = {
      ...plannerCopy[index],
      hours: parseInt(plannerCopy[index].hours) + 1,
    };
    plannerCopy.splice(index, 1, updatedObj);
    setPlanner(plannerCopy);
    localStorage.setItem("planner", JSON.stringify(plannerCopy)); // Save updated data
  };

  // - Button to decrement hours
  const handleMinusBtn = (index) => {
    const plannerCopy = [...planner];
    const updatedObj = {
      ...plannerCopy[index],
      hours: Math.max(0, parseInt(plannerCopy[index].hours) - 1), // Prevent negative hours
    };
    plannerCopy.splice(index, 1, updatedObj);
    setPlanner(plannerCopy);
    localStorage.setItem("planner", JSON.stringify(plannerCopy)); // Save updated data
  };

  return (
    <>
      <div className={styles.form_container}>
        <h2 className={styles.heading}>Geekster Education Planner</h2>
        <form>
          <div className={styles.row}>
            <input
              className={styles.col}
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />

            <input
              className={styles.col}
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => {
                setHours(e.target.value);
              }}
            />
          </div>

          <div className={styles.row}>
            <button className={styles.btn} onClick={handleAddClick}>
              ADD
            </button>
          </div>
        </form>
      </div>

      {planner.map((data, index) => {
        return (
          <div key={`card_${index}`}  className={styles.card}>
            {data.subject}  -  {data.hours} hours
            <button
              className={styles.btnplus}
              onClick={() => {
                handlePlusBtn(index);
              }}
            >
              +
            </button>
            <button
              className={styles.btnminus}
              onClick={() => {
                handleMinusBtn(index);
              }}
            >
              -
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Card;
