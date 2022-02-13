import React, { useState } from "react";
import Card from "../UI/Card";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userData = {
      username: enteredUsername,
      age: enteredAge,
    };

    props.onSaveUserData(userData);
    setEnteredUsername("");
    setEnteredAge("");
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className={`${styles["add-users"]}`}>
          <div className={`${styles["add-user"]}`}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" onChange={usernameChangeHandler} />
          </div>
          <div className={`${styles["add-user"]}`}>
            <label htmlFor="age">Age (Years)</label>
            <input id="age" type="number" onChange={ageChangeHandler} />
          </div>
        </div>
        <div className={`${styles["add-user__actions"]}`}>
          <button type="submit">Add User</button>
        </div>
      </form>
    </Card>
  );
};

export default AddUser;
