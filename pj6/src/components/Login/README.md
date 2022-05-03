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
