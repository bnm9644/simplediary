import { useRef, useState } from "react";

const DiaryItem = ({onEdit,onRemove, author, content, create_date, emotion, id}) => {
    
    const [isEdit, setIsEdit] = useState(false); // 수정중인지 비수정중인지 판단

    const toggleIsEdit = () => setIsEdit(!isEdit); // 원래 갖고 있던 isEdit 값을 반전
    
    const [localContent, setLocalContent] = useState(content); //수정하기 시 바뀔 내용 받는 부분

    const localContentInput = useRef(); // 수정하기 영역의 DOM 요소 가져와야 하므로 추가

    const handleRemove = () => {
        if(window.confirm(`${id} 번쨰 일기를 삭제 하시겠습니까?`)) {
            onRemove(id);
        }
    }
    
    // 수정하기 누르고 취소 시 데이터 그대로 남는 현상 방지
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    //수정완료 버튼을 눌렀을때 
    const handleEdit = () => {

        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }

        if(window.confirm(`${id}번 째 일기를 수정 하겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit(); // 이걸 선언 안하면 수정은 되나, 닫히지 않음
        }
    }

    return (
    <div className = "DiaryItem">
        <div className="info">
            <span>
                작성자 : {author} | 감정점수 : {emotion}
            </span>
            <br />
            <span className="date"> {new Date(create_date).toLocaleString()}</span>
        </div>    
        <div className="content">
            {isEdit ? ( // useState 시키기 위해, isEdit으로 변경, 
              <>
                <textarea 
                    ref = {localContentInput}
                    value = {localContent} 
                    onChange={(e) => {setLocalContent(e.target.value);}} // 현재 입력한 값 그대로, e는 event 자게 객체
                />
              </> 
              ) : ( 
                <>{content}</>  // setEdit 함수들 통해 변경
            )}
        </div>

        {isEdit ? (
            <>
                <button onClick = {handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit}>수정 완료</button>
            </>
        ) : (
            <>
                <button onClick = {handleRemove}>삭제하기</button>
                <button onClick = {toggleIsEdit}>수정하기</button>
            </>
        )}                
    </div>
    );
};

export default DiaryItem;