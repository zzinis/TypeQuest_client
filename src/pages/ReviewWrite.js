import '../styles/ReviewWrite.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const goReview = () => {
        navigate('/Review');
    };
    return (
        <>
            <div className="writeLayout">
                <div className="Write">
                    <fieldset className="writeReview">
                        <legend className="font">리뷰 작성</legend>
                        <label htmlFor="title" className="font">
                            제목 : <input type="text" id="title" className="title" placeholder="제목을 입력하세요" />{' '}
                        </label>
                        <textarea cols="30" rows="10" className="content" placeholder="내용을 입력하세요"></textarea>
                        <button type="button" className="submit" onClick={goReview}>
                            작성 완료
                        </button>
                    </fieldset>
                </div>
            </div>
        </>
    );
}
export default ReviewWrite;
