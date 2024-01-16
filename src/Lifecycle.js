import React,{useState,useEffect} from "react";

/* 
  Lifecycle (생애주기)
  (초기화) -> (예외 처리) -> (메모리 정리)
   mount   ->  update    ->   unmount
   (탄생)       (변화)         (죽음)

  1) mount (화면에 나타나는 것)
  2) update (state가 바뀌거나, 부모가 리렌더 되거나, prop이 바뀌어 자기 컴포넌트가 리렌더 되는과정)
  3) unmount (컴포넌트가 화면에서 사라지는 것)
 
  ★ React Hooks - useState , useRef , useEffect 
  - '클래스 형' 컴포넌트가 가지고 있는 기능을 현재의 ★'함수형 컴포넌트에서 사용할수 있게 함'.

  useEffect : React의 Lifecycle을 제어하는 메서드, Hook 할수 있는 기능,

  import React, { useEffect } from "react";
  ★ useEffect (callback, []); - 배열 내의 값이 변화하면 callback 함수 실행!
 
*/


const Lifecycle = () => {

  const [count , setCount] = useState(0);
  const [text , setText] = useState("");


  // ★ 배열 값이 변하게 되면, 바로 callback 함수 실행! , 감지하고 싶은 값만 감지하여, 변화 하는 순간만, callback 함수 실행! 
  useEffect(() => {
   console.log("console mount"); // 현재는 컴포넌트가 mount 될때만 실행
  } , []);

  useEffect(() => {
    console.log("update!");     // 현재 mount 후 리렌더링이 될때만 실행
   });

   useEffect(() => {            
    console.log (`count is update : ${count}`);
    if(count > 5) {
      alert("5초과, 1로 재 세팅 합니다.");
      setCount(1);
    }
   },[count]);

   useEffect(() => {            // 배열 값이 변하게 되면, 바로 callback 함수 실행!
    console.log (`text is update : ${text}`);
   },[text]);

  return <div style={{padding : 20}}>
    <div>
      {count}
      <button onClick = {() => {setCount(count+1)}}> + </button>
    </div>
    <div>
      <input value = {text} onChange={(e) => {setText(e.target.value)}}></input>
    </div>

  </div>;
};

export default Lifecycle;