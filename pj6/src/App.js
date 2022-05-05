import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}
// State 를 관리하던 코드들을 모두 auth-context.js 파일로 이동, App 컴포넌트의 역할에만 초점을 둘 수 있음
// App 컴포넌트에서 해당 핸들러들을 관리하지 않기에 onLogin 및 onLogout props 도 제거

export default App;
