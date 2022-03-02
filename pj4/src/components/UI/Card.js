import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${styles.center}`}>
      <div className={`${styles.card} ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
