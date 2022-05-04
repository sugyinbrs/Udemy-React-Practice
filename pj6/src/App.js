import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfomation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfomation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
    /*
    - AuthContext.Provider -> 내장 기능, 공급자, 감싸진 모든 컴포넌트는 이제 해당 context 에 접근할 수 있음, value 내부 객체가 변경될 때마다 모든 소비 컴포넌트에 전달됨, isLoggedIn 이 변경될 때마다 리액트에 의해 업데이트 됨
    - 문자열이나 객체 등을 전달할 수는 없지만 함수는 전달할 수 있음
    - 많은 컴포넌트를 통해 전달하고자 하는 것이 있는 경우에 혹은, 매우 특징적인 일을 하는 컴포넌트 (예 - 로그아웃)인 경우에 Context 를 사용하는 것이 좋음. state 관리하기 용이하고 코드가 간결해짐
    */
  );
}

export default App;
