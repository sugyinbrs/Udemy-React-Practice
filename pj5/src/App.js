import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </React.Fragment>
  );
  // return (
  //   <>
  //     <AddUser onAddUser={addUserHandler} />
  //     <UsersList users={usersList} />
  //   </>
  // );
}
// 위의 두 문법은 모두 빈 Wrapper 를 렌더링하며 DOM 에 HTML 요소를 렌더링 하지 않음
// 리액트에 모두 내장되어 있으나 아래의 경우는 프로젝트 셋업이 지원 해야함
// 기본적인 원리를 위해 작성하였던 것일 뿐 직접적으로 Wrapper Component 를 직접 작성하지는 않음

export default App;
