import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }; // email 에 입력한 최신 값에 접근하기 위해 기존 값을 불러오는 state.value 입력
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

/* 
Login 컴포넌트 함수 외부에서 위의 Reducer 함수를 선언, Login 컴포넌트 함수 내부의 데이터가 필요하지 않기 때문, 상호 작용할 필요가 없기 때문, 리액트가 위 함수를 실행할 때 리듀서 함수 내부에서 요청되고 사용되는 모든 데이터는 위 함수에 자동으로 전달될 것임

위 Reducer 함수에는 2개의 매개변수가 들어가는데 하나는 최신 state 스냅샷, 다른 하나는 디스패치된 action임

위 함수에서 action 을 다룸, 예를 들어 해당 action 의 type 이 "USER_INPUT" 로 동일한 문자열인지 확인할 수 있음, "USER_INPUT" action 을 받을 때마다 value 와 isValid 를 모두 업데이트 할 수 있음

action 을 dispatch 한 것은 객체일 것임. 아래 컴포넌트 내부의 emailChangeHandler 함수에서 설정했기 때문.

emailState 를 그룹화 하여 한 곳에서 관리할 수 있음
*/

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  // emailState 에 대한 초기 state 설정할 수 있음

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // Alias Assignment(별칭 할당) with Object Destructuring
  // * useEffect 를 더욱 최적화, 불필요하게 실행되는 것을 피하기 위함
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  // (:) -> 등호의 왼쪽에서 사용 중, 값을 할당하는 것이 아님, 값(속성)을 추출하여 상수에 저장하기 위해 별칭을 할당하는 것임

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  // 위와 같이 작성한다면 값만 변경되고 유효성은 변경되지 않으면 위의 useEffect 함수는 실행되지 않음
  // 예) 비밀번호 값 변경 시 초반에는 useEffect 가 실행되나 일단 비밀번호가 유효하면 문자 하나를 더 입력하더라도 console 창에서 유효성 출력의 추가 확인("Checking form validity!")이 일어나지 않음

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    /*
    dispatchEmail 를 호출하여 업데이트 함

    Action, 보통은 어떤 식별자 및 필드를 가진 객체, type 필드가 일어난 일을 설명해주고 유저가 입력한 값의 payload(val) 를 갖음
    */

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6); // 재검증하는 대신 emailState.isValid 이 true 인지 확인할 수 있음
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
    // 여기에 반드시 value 를 추가할 필요 X, input 이 포커스를 잃었다는 것이 중요한 부분이기 때문
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.value === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
