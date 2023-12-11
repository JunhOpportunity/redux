# Redux Study

React Query의 편리함을 직접 느껴보기 위해 오랜만에 다시 Redux를 꺼내서 사용해보자.

## Redux가 필요한 이유

## Redux 문법

```jsx
// Reducer 함수 생성
const reducer = (state, action) => {};

// Redux 데이터 저장소 생성
const store = createStore(reducer);

// Redux 데이터 엑션 요청 (action은 반드시 객체 형태 + type을 갖고 있어야 함.)
store.dispatch({type: "타입"});

// Redux 데이터 요청
store.getState();
```

- reducer 함수가 반환하는 값이 데이터가 된다.
- 오직 reducer 함수 내에서만 데이터를 수정할 수 있다.
    - reducer 함수 내에서 action을 사용해 Reducer 동일한 방법으로 동작을 수행한다.

### Reducer 함수 작성 방법 예시

```jsx
const reducer = (state = 0, action) => {
	if (action.type === "PLUS") {
		return state + 1;
	} else if (action.type === "MINUS") {
		return state - 1;
	}
	return state;
}

// Refactoring (if-else -> switch)
const reducer = (state = 0, action) => {
	switch (action.type) {
		case "PLUS":
			return state + 1;
		case "MINUS":
			return state - 1;
		default:
			return state;
	}
}

```

## Redux의 메서드

- `dispatch()` : 데이터의 변경을 요청할 때 사용
- `subscribe()` : 데이터의 변화를 감지하고 변화되었을 때 콜백함수를 실행시킨다.
- `getState()` : 데이터 가져올 때 사용
- `replaceReducer()` :

## Redux의 주의 사항

※ 절대 객체나 배열 형태의 State를 직접 변경하려 하지 말자. 새 객체나 배열로 만들어서 그걸 넘겨주어야 한다. (React 공식 문서에서 언급하는 내용과 같다. 객체나 배열은 그 데이터 자체가 아니라 데이터가 존재하는 위치에 대한 주소를 참조하고 있는 것이기 때문에 객체나 배열 자체를 새로 넣어주는 것이 아니라면 변화를 감지하지 못한다.)

```jsx
return [...state, newState]

return {
	ob: ject,
	...obj
}
```

# React redux

## 기본

Provider 로 감싸주어야 한다

```jsx
<Provider store={store}>
	<App/>
</Provider>
```

## 컴포넌트에서 Redux Store 데이터 연결하기

> connect를 사용했지만 현재는 useSelector 사용을 권장한다.
> 

### Connect

- connect는 state와 dispatch 두 개의 매개변수를 갖는다.
- 여기서 주의할 점은 해당 컴포넌트를 미리 export 하지 말고 connect 부분에서만 export 해줘야 한다는 것이다.
- mapStateToProps 함수는 반드시 객체 형태를 반환해야 한다.

```jsx
import { connect } from "react-redux"

function mapStateToProps(state, ownProps) {
  return { toDo: state };
}

export default connect(mapStateToProps)(Home);
```

이렇게 connect로 연결하게 되면 store 의 state를 받아올 수 있다.

### useSelector