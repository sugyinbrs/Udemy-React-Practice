# Context Limitations (리액트 컨텍스트 제한)

## 변경이 잦은 경우 React Context 는 그리 적합하지 않음

- 매초 또는 1초 마다 state가 변경되는 경우
  \*\* 앱 전체에 걸쳐 또는 컴포넌트 전체에 걸쳐 state가 자주 변경 되는 경우에는 어떻게 하는 것이 좋을까? -> Redux

## 모든 Component 커뮤니케이션과 Props 를 대체하는 용도로 React Context를 사용하지 말 것

- Props 는 Component 구성에 있어 여전히 중요하고 필수적임
- 짧은 Props Chain에 있어서는 그대로 사용하는 것을 권장하나 긴 Props Chain을 교체하기 위해서라면 React Context를 사용해볼만함
