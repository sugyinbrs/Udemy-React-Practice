import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

// 새로운 Component 이나 같은 파일에 추가할 것임, 이 앱에서는 Backdrop Component 를 Modal 과 함께 사용하고만 있기 때문
// Backdrop 과 ModalOverlay Component 두 개로 쪼갠 이유는 Portal을 다루기 간편해지기 때문
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};
// React-Dom 은 React 를 사용해 로직과 각종 기능들을 웹 브라우저로 가져오고, DOM 과 호환되도록 만들어줌
// 첫 번째 인수는 렌더링 되어야 하는 리액트 노드, 두 번째 인수는 요소들이 렌더링 되어야 하는 실제 DOM 안의 컨테이너를 가리키는 포인터임
// 렌더링 된 HTML 콘텐츠를 다른 곳에 옮기는 것이 Portals 의 핵심, Component 를 사용하는 곳에서 createPortal 을 사용해서 Component 의 HTML 컨텐츠를 DOM 이 렌더링 되고 있는 다른 곳에 옮길 수 있음
// JSX 와 Component 내에서는 전과 동일한 방식으로 작업을 이어갈 수 있음
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
