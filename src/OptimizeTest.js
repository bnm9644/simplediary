import React, { useState,useEffect } from "react";

/*
 ★ 컴포넌트 둘다 연결 둘다 렌더링 일어남,
    콜백에다가 React.memo를 감싸면 
    그 함수는 쓸데없는 함수에 재 랜더링 하지 않는다.

    객체를 비교하는 방법 - 얕은 비교
    객체에 똑같은 내용이 있어도 같지 않다.
    왜냐하면, 객체는 '주소' 를 통한 비교를 하기 떄문,
    areEqual(CounterA , CounterB)
*/

const CounterA = React.memo(({count}) => {

  useEffect(()=>{
    console.log(`CounterA update - count : ${count}`)
  });

  return <div>{count}</div>
});

const CounterB = ({obj}) => {
  useEffect(()=>{
    console.log(`CounterB update - count : ${obj.count}`)
  });
  
  return <div>{obj.count}</div>
};

// 이전 props 와 현재 props 가 같으면  -> 리렌더링 안 함
// return false; // 이전과 현재가 다름 -> 리렌더링
const areEqual = (prevProps, nextProps) => {
  if(prevProps.obj.count === nextProps.obj.count) {
    return true; 
  }

  return false;
}

// CounterB 함수는 areEqual 함수 결과에 따라 리렌더링 할지 말지 결정
const MemorizeCounterB = React.memo (CounterB,areEqual);

const OptimizeTest = () => {
  
  const [count, setCount] = useState(1);
  const [obj , setObj] = useState({
    count : 1,
  });

  return <div style={{padding:50}}>
    <div>
      <h2>Counter A</h2>
      <CounterA count={count}/>
      <button onClick={()=> setCount(count)}>A button</button>
    </div>
    <div>  
      <h2>Counter B</h2>
      <MemorizeCounterB obj={obj}/>
      <button onClick={()=> setObj({
        count : obj.count
      })}>B button</button>
    </div>
  </div>
}

export default OptimizeTest;