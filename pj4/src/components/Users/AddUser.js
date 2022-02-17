import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

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

    console.log("userData >>>", userData);

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
            <input
              id="username"
              type="text"
              value={enteredUsername}
              onChange={usernameChangeHandler}
            />
          </div>
          <div className={`${styles["add-user"]}`}>
            <label htmlFor="age">Age (Years)</label>
            <input
              id="age"
              type="number"
              value={enteredAge}
              onChange={ageChangeHandler}
            />
          </div>
        </div>
        <div className={`${styles["add-user__actions"]}`}>
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddUser;
