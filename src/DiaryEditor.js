import React, { useRef, useState } from "react";

const DiaryEditor = ({onCreate}) => {

    const authorInput = useRef();  //★ HTML 요소 접근! - HTML 태그에 ref 속성으로 이용!! (DOM 접근) - HTML 태그에 ref 속성으로 ref = {authorInput} 으로 연결
    const contentInput = useRef(); //★ HTML 요소 접근! - HTML 태그에 ref 속성으로 ref = {contentInput} 으로 연결

    const [state, setState] = useState({
        author : "",
        content : "",
        emotion : 1,
        //프로퍼티가 여러개 달릴떄는 ...(스프레드 연산자 사용 가능), 초반 설정 값을 겟!
    });

    const handleChangeState = (e) => {
        setState ({
            ...state,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = () => {
        if (state.author.length < 1) {                    
            authorInput.current.focus();    // input 태그의 ref 속성으로 잡은 author의 input 태그가 focus이벤트 처리
            return; //중단
        }

        if (state.content.length < 5) {
            contentInput.current.focus();   // ref를 부여한 HTML요소에 .current로 접근!
            return;
        }
        
        onCreate(state.author, state.content, state.emotion);
        alert('저장 성공');
        setState ({
            author : "",
            content : "",
            emotion : 1,
        }) 
    };     
    
    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input 
                ref = {authorInput} 
                name = "author"
                value = {state.author} 
                onChange={handleChangeState}
                />
            </div>
            <div>
                <textarea 
                    ref = {contentInput}
                    name = "content"
                    value = {state.content} 
                    onChange={handleChangeState}            
                />
            </div>
            <div>
                <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                    <option value = {1}>1</option>
                    <option value = {2}>2</option>
                    <option value = {3}>3</option>
                    <option value = {4}>4</option>
                    <option value = {5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    );
};

export default DiaryEditor;
