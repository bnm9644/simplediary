import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';
//https://jsonplaceholder.typicode.com/comments

/* 배열 만듬
const dummyList =  [
  {
    id: 1,
    author :"이정환",
    content :"하이1",
    emotion : 5,
    create_date : new Date().getTime() // 현재 시간 기준    
  },
  {
    id: 2,
    author :"홍길동",
    content :"하이2",
    emotion : 1,
    create_date : new Date().getTime() // 현재 시간 기준    
  },
  {
    id: 3,
    author :"이무생",
    content :"하이3",
    emotion : 3,
    create_date : new Date().getTime() // 현재 시간 기준    
  },
  
];
*/

function App() {  
  
  const [data, setData] = useState([]); // 일기 데이터,  시작은 빈 배열로, 저장시 상태 변화 (setData)

  const dataId = useRef(0);

  // API 쏘는 방법 - fetch! , async 선언 - promise 반환, 비동기 함수 
  const getData = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments"). then((res) => res.json());
    //console.log(res);

    // 해당 함수는 res 배열 api 정보 가져와, 0~20번째만 추려내고
    // 그걸 map으로 it로 둬 프로퍼티를 하나씩 가져옴
    const initData = res.slice(0,20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1,
        create_date : new Date().getTime(),
        id : dataId.current++
      }
    });

    setData(initData);
  };

  // mount 되자마자 호출
  useEffect(()=> {
    getData();
  }, []);


  // 새로운 일기 생성
  const onCreate = (author,content,emotion) => {
    const create_date = new Date().getTime();

    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id : dataId.current
    };

    dataId.current += 1;
    setData([newItem, ...data]); //새로운 데이터가 제일 위에 올라와야 함
  } 
  
  // 데이터 삭제 - 일기 삭제
  const onRemove = (targetId) => {
    // console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId); 
    // targetId 가 포함되지 않은 배열로만,setData -> diaryList 한번더 바뀌며 리렌더
    setData (newDiaryList);
  }; 

  // 리스트 내 content 수정하기, 어떤 걸 받아와야 하여, 뭘 수정하는지 알아야 함
  // 매개변수로 받은 targetId를 갖는 일기 데이터, 배열에서 수정 , setData 통해 수정된 배열 전달
  const onEdit = (targetId, newContent) => {
    setData (
      data.map((it) => it.id === targetId ? {...it, content:newContent} : it)  
    ) 
  }

  /* 
    메모이제이션 : 이미 계산 해본 연산 기억해 뒀다가, 
                  동일한 계산 시 기억 해뒀던 데이터를 반환!
                  useMemo (cb,[]);
  */

  const getDiaryAnalysis = useMemo(
    () => {
    const goodCount = data.filter((it) => it.emotion >=3).length;
    const badCount = data.length -goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount,goodRatio,badCount}; 
  }, [data.length] // 데이터 길이가 안 변하면 계산 안하고 반환
  );

  // ★ cb 함수가 리턴하는 값을 그대로 리턴, 값을 리턴하는것이므로 값으로 사용
  const {goodCount,goodRatio,badCount} = getDiaryAnalysis;

  return (
    <div className = "App">    
      <DiaryEditor onCreate = {onCreate}/>
      <div>전체 일기 : {data.length} </div>
      <div>기분 좋은 일기 : {goodCount} </div>
      <div>기분 나쁜 일기 : {badCount} </div>
      <div>기분 좋은 일기 비율 : {goodRatio} % </div>
      <DiaryList onEdit = {onEdit} onRemove = {onRemove} diaryList = {data} /> 
    </div>
    );  
}

// diaryList를 dummyList 배열로 prop 전달, 
// React 는 단방향으로만 데이터가 흐름,

// App 이 현재 부모 컴포넌트 (데이터를 가지고 있음), 현재는 수정 시도 마찬가지로 App 에서 DiaryItem까지 보내줘야 함 
/* 자식 컴포넌트는 DiaryEditor, DiaryList 인데 Editor와 List 간의 데이터 이동은 안됨
    - state 끌어올리기
 */

/* LifeCycle : 생애 주기 
   탄생 - 화면에 나타나는 것 (Mount)
   변화 - 업데이트 (Re- Render) (Update)
   죽음 - 화면에서 사라짐 (UnMount)
 */    

export default App;
