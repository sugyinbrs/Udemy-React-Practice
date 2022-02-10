import React from "react";

import styles from "./Button.module.css";

// import styled from "styled-components";

// const Button = styled.button`
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &hover,
//   &active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;

const Button = (props) => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

// CSS Module 이 하는 일, 개념, 빌드 프로세스가 내부에서 하는 작업은 기본적으로 CSS 클래스와 CSS 파일을 가져와서 클래스 이름을 고유한 이름으로 바꾸는 것
// CSS 파일에 설정한 CSS 스타일이 이 파일을 가져오는 컴포넌트로 범위가 지정되도록 하는 것

export default Button;
