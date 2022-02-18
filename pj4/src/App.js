import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

const App = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const addUserInforHandler = (data) => {
    setUserInfo((prevUserInfo) => {
      return [data, ...prevUserInfo];
    });
    setIsEditing(true);
  };

  return (
    <div>
      <AddUser onSaveUserData={addUserInforHandler} />
      {!isEditing && <div style={{ display: "none" }} />}
      {isEditing && <UserList items={userInfo} />}
    </div>
  );
};

export default App;
