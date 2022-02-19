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

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }
    // trim() 사용하여 유저이름과 나이의 길이가 0과 같다면 return 으로 반환하여 submitHandler 함수 내 다음 순서 코드를 실행시키지 않음

    if (enteredAge.trim() < 0) {
      return;
    }
    // trim() 사용하여 나이의 길이가 0보다 작다면 return 으로 반환하여 submitHandler 함수 내 다음 순서 코드를 실행시키지 않음

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
