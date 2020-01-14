import React from "react";
import classes from "./Cockpit.module.css";

const cockpit = props => {
  // Dynamic css classes
  const assignedClasses = [];
  let btnClass = classes.green;

  if (props.persons.length <= 2) {
    //classNames.push("red");
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <= 1) {
    //classNames.push("bold");
    assignedClasses.push(classes.bold);
  }

  if (props.showPersons) {
    btnClass = classes.red;
  }

  return (
    <div className={classes.Cockpit}>
      <h1>Hello React!</h1>
      <p className={assignedClasses.join(" ")}>Style changes conditionally</p>
      <button className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
    </div>
  );
};

export default cockpit;
