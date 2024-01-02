import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

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
    console.log(`${targetId}가 삭제되었습니다.`);
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

  return (
    <div className = "App">    
      <DiaryEditor onCreate = {onCreate}/>
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

   React Hooks (함수형 컨퍼넌트)
   useState - 
   useEffect  - 
   useRef 

 */    

export default App;