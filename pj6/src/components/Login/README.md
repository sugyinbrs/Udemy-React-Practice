# useState() vs. useReducer()

## useState()

- 주요 state 관리 도구
- 개별 state 및 데이터들을 다루기에 적합, 간단한 state에 적합
- state 업데이트가 쉽고 몇 종류 안 되는 경우에 적합

## useReducer()

- 복잡한 state 업데이트 로직을 포함하는 Reducer 함수를 사용할 수 있음
- 연관된 state 데이터들을 다룰 때 적합
- 복잡한 state 업데이트가 있는 경우나 state 하나를 변경하는 여러 다른 액션이 있는 경우 적합

* 상황에 맞게 둘 중 하나를 선택하여 사용하는 것이 바람직
* 두 개의 서로 다른 값을 전환하기만 하는 단순한 state가 있는 경우라면 useReducer 사용은 과할 수 있음

# Rule of Hooks

## 1) React 함수에서만 호출해야 함

- React Component 함수 (JSX 를 반환)
- Custom (사용자 정의) Hooks

## 2) 최상위 수준에서만 React Hooks를 호출해야 함

- React Hooks는 중첩 함수에서 호출할 수 없음
  (예시

  ```jsx
  const Login = () => {
    useContext(); // (O)
    ...
    useEffect(() => {
      useContext(); // (X)
      ...
    }, []);
  };

  export default Login;
  ```

  )

- 어떠한 block (IF) 문에서도 호출하지 말 것

## +) useEffect를 위한 추가의, 비공식적인 규칙

- 항상 참조하는 모든 것들(브라우저에서 오지 않는 주변 Component state, props의 일부 등, useEffect 를 사용하는 모든 데이터)을 dependency(의존성)로 useEffect 내부에 추가해야 함
- useReducer 또는 useState에 의해 노출된 state 업데이트 함수는 변경되지 않도록 리액트가 보장하기에 dependency(의존성)에 추가할 필요가 없음

(예시

```jsx
const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);

...

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]); // setFormIsValid 는 예외사항이기에 추가되지 않았음, 생략 가능

  ...

export default Login;
```

)
