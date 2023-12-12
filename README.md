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

## Setup

`$ npm i react-redux react-router-dom`

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

- connect는 state(=mapStateToProps)와 dispatch(=mapDispatchToProps) 두 개의 매개변수를 갖는다.
- 여기서 주의할 점은 해당 컴포넌트를 미리 export 하지 말고 connect 부분에서만 export 해줘야 한다는 것이다.
- mapStateToProps와 mapDispatchToProps 는 반드시 객체 형태를 반환해야 한다.
- 연결된 컴포넌트의 props에서 state와 dispatch를 사용할 수 있다.

```jsx
import { connect } from "react-redux"

function App({state, dispatch})

function mapStateToProps(state, ownProps) {
  return { toDo: state };
}

function mapStateToProps(dispatch, ownProps) {
  return { dispatch };
}

export default connect(mapStateToProps, mapStateToDispatch)(Home);
```

이렇게 connect로 연결하게 되면 store 의 state를 받아올 수 있다.

### mapStateToProps

> 컴포넌트와 Redux Store state를 연결시켜주는 역할을 한다.
> 
- 매개변수로 state와 ownProps를 받는다.
    - state : 현재 Redux store의 state 데이터를 말한다.
    - ownProps : history, location, match, staticContext 등 다양한 것들을 담고 있다.

### mapDispatchToProps

> Redux Store state 데이터를 조작하는 역할을 한다.
> 
- 매개변수로 dispatch와 ownProps를 받는다.

### useSelector

> mapStateToProps 대신 사용해 Redux store state의 데이터를 가져온다.
> 

`const userData = useSelector((state) => state)`

위 코드를 사용해 바로 state를 가져올 수 있다.

### useDispatch

> mapStateToDispatch 대신 사용하는 것
> 

```jsx
const dispatch = useDispatch();

dispatch(addUser(id))
```

# Redux Toolkit

## Setup

`$ npm i @reduxjs/toolkit`

## 사용 방법

### createAction

- `createAction(타입)` :  액션을 생성하고 액션의 타입까지 정의한다.
- `createAction` 으로 생성한 변수는 함수 형태이고, 함수를 실행하면 타입과 payload를 가진 객체를 반환한다.

```jsx
import { createAction } from "@reduxjs/toolkit";

const addUser = createAction("ADD");
const deleteUser = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now(), ...state }];
    case deleteToDo.type:
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};
```

### createReducer

> 위에서 선언한 리듀서 함수에서 switch-case 문을 제거해 더 간단하게 만든 것
> 
- Redux Toolkit 에서는 state를 직접 변경해도 문제가 없다. 즉, 매번 새 객체나 배열을 생성할 필요가 없다. (Immer을 사용하고 있어서 변경 사항을 체크할 수 있기 때문이다.)
- builder 콜백을 사용하지 않으면 에러가 발생하니 주의하자.

```jsx
import { createReducer } from "@reduxjs/toolkit";

const reducer = createReducer(initialState, (builder) => {
  builder
	.addCase(addToDo, (state, action) => {})
  .addCase(deleteToDo,(state, action) => {})
})
```

### configureStore

> Redux Store 를 생성
> 

```jsx
export const store = configureStore(reducer)
```

### createSlice

> Reducer, action 을 생성
> 
- 리듀서와 엑션을 생성하기 때문에 createAction과 createReducer가 필요없어진다.
- createSlice는 name, initialState, reducers 를 가진 객체를 받아야 한다.
- configureStore의 인자로 reducer 를 가진 객체를 받아야 한다.

```jsx
const toDo = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => {
      state.filter((toDo) => toDo.id !== action.payload);
    },
  },
});

export const store = configureStore({ reducer: toDos.reducer });
```