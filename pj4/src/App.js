import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

const App = () => {
  const [userInfo, setUserInfo] = useState([]);

  const addUserInforHandler = (data) => {
    setUserInfo((prevUserInfo) => {
      return [data, ...prevUserInfo];
    });
  };

  return (
    <div>
      <AddUser onSaveUserData={addUserInforHandler} />
      <UserList items={userInfo} />
    </div>
  );
};

export default App;
