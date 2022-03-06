import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("EFFECT RUNNING"); // 컴포넌트 첫 번째 마운트 시 작동

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, [enteredPassword]); // dependency, 컴포넌트가 재평가 될 때마다 다시 변함, 상태가 변할 시

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    }; // Cleanup function
  }, [enteredEmail, enteredPassword]);
  /*
  위의 useEffect() 는 지금까지 알던 (아래의 1, 2, 3) Side Effect 와는 달라서 혼동을 줄 수 있음
  1) data 를 localStorage 와 같은 내장된 브라우저 저장소에 저장을 함
  2) 백 엔드 서버로 HTTP request 를 보냄
  3) Timer 를 설정

  대신에 리액트 상태를 업데이트 하고 있음

  우리가 useEffect 의 주요 업무를 생각해본다면 바로 Side Effect 를 처리하는 것임

  때때로 Side Effect 는 위의 1, 2, 3의 과정을 가리키기도 하지만 작성한 코드도 그에 해당함
  모든 key stroke 을 감지하고 그에 대한 'response' 로 form 유효성을 확인하고 업데이트 하는 것도 Side Effect 를 일으킬 수 있음
  여기서의 Side Effect 는 data 를 입력하는 사용자의 Side Effect 임

  useEffect 는 뭔가의 'response' 로 실행되는 코드를 처리하게 해줌
  그 무언가는 로드 되는 컴포넌트가 될 수 있으며 이메일 주소가 업데이트 될 수도 있음
  action 이 있을 때마다 다른 action 의 'response' 로 실행될 것임
  */

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
