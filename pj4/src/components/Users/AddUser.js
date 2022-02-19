import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    // trim() 사용하여 유저이름과 나이의 길이가 0과 같다면 return 으로 반환하여 submitHandler 함수 내 다음 순서 코드를 실행시키지 않음

    if (enteredAge.trim() < 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age (> 0).",
      });
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {/*
      Modal 을 종료하기 위해서는 에러 상태를 비워야함.

      만약 error 상태 snapshot 에 저장되어 있는 것이 truthy 라면, 그리고 그게 자바스크립트 객체라면, Error Modal 을 렌더할 것임.

      Error Modal 을 제거하는 방법은 error 를 undefined 나 null 값으로 리셋하거나 기타 다른 falsy 값으로 설정하는 것임.
       */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClick={errorHandler}
        />
      )}
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
    </div>
  );
};

export default AddUser;
