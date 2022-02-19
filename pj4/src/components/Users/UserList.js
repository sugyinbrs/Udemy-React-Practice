import Card from "../UI/Card";
import styles from "./UserList.module.css";

const UserList = (props) => {
  return (
    <Card>
      <div className={`${styles.users}`}>
        <ul>
          {props.items.map((data) => (
            <li key={data.id}>
              {data.username} ({data.age} years old)
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default UserList;
