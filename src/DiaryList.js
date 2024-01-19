import DiaryItem from "./DiaryItem.js";

// 일기 리스트
const DiaryList = ({onEdit,onRemove,diaryList}) => {

    return (
        <div className= "DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 존재</h4>
            <div>
                {diaryList.map((it) => (
                    <DiaryItem key={it.id} {...it} onEdit = {onEdit} onRemove = {onRemove}/>
                ))}
            </div>
        </div>
    );
};

//DiaryList - 기본 속성 , 이게 없으면 diaryList에 값 없을때 렌더링 시 Error!
DiaryList.defaultProps = {
    diaryList: [],
}

// map 내장함수로 List 렌더링!
// it : diaryList의 배열 하나하나 요소가 it으로 바뀌어 들어옴 
// it.author , it.emotoion 등 객체 점 표기법으로 접근!

export default DiaryList;