import React, { useState, useEffect } from "react";

// 전용 Context 컴포넌트 및 전용 Context 파일
// off state 관리와 AuthContext 관리를 하나의 파일에서 집중적으로 할 수 있음
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});
// 아무 것도 하지 않는 dummy function, 더미 함수를 추가할 수 있음
// 프리뷰 자동 완성으로 뜨게할 수 있음, 예 - ctx.onLogout

export const AuthContextProvider = (props) => {
  // AuthContextProvider 에서 전체 로그인 state 관리, 모든 Context 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfomation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfomation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

/*
    - AuthContext.Provider -> 내장 기능, 공급자, 감싸진 모든 컴포넌트는 이제 해당 context 에 접근할 수 있음, value 내부 객체가 변경될 때마다 모든 소비 컴포넌트에 전달됨, isLoggedIn 이 변경될 때마다 리액트에 의해 업데이트 됨
    - 문자열이나 객체 등을 전달할 수는 없지만 함수는 전달할 수 있음
    - 많은 컴포넌트를 통해 전달하고자 하는 것이 있는 경우에 혹은, 매우 특징적인 일을 하는 컴포넌트 (예 - 로그아웃)인 경우에 Context 를 사용하는 것이 좋음. state 관리하기 용이하고 코드가 간결해짐
    */
