import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  // 자바스크립트에서는 하나 이상을 리턴할 수 없기 때문에 리액트 JSX 에서는 하나 이상의 루트 JSX 요소를 가질 수 없음
  // 그래서 아래처럼 JSON 요소를 div 로 감싸서 해결함, 리턴하는 한 개의 값(div)만 가질 수 있게 됨
  // div 대신 [] 배열을 사용해서 감싸줄 수도 있음. 또한 JSX 내부가 아니기에 {} 중괄호를 없앨 수 있음
  // 그 상태로 실행하게 되면 Console 창에 key 값이 필요하다는 경고가 뜸. 왜냐하면 JSX 요소 배열로 작업할 때마다 리액트는 모든 요소에 key 를 원하기 때문. (UserList.js - map() 참고)
  // 그러나 이러한 방법보다는 div 로 감싸주는 기존 방식이 편함

  // 문제는 아래와 같은 div soup 라는 문제가 발생하게 됨. 불필요하게 렌더되고 감싸는 div 들이 발생할 것임.

  // <div>
  //   <div>
  //     <div>
  //       <div>
  //         <h2>div soup의 늪</h2>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  // 문제 1) 시맨틱 요소가 없는 수많은 <div> 요소가 발생하게 될 것임
  // 문제 2) 수많은 HTML 요소가 렌더될 것이며 이것은 앱이 느려지게 할 것임

  // 해결책으로 Wrapper 컴포넌트를 생성하여 div를 대신함
  // Wrapper 컴포넌트 - 의미는 없으나 JSX 구문으로 채움

  // 반드시 하나의 root 컴포넌트가 DOM에 렌더 되어야 함. JSX 요구사항에도 반드시 하나의 root 요소가 있어야 함. 그래서 아래와 같이 Wrapper 라는 하나의 root 요소를 둠
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
