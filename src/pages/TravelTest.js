import { useState } from 'react';
import '../styles/TravelTest.scss';
import { useNavigate } from 'react-router-dom';
import Questions from '../common/api/questionApi.json';
import Footer from './Footer';
import MainHeader from './Header';
function TravleTest() {
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState(1);
    const [num, setNum] = useState(0);
    const [mbtiList, setMbtiList] = useState([]);
    const navigate = useNavigate();
    if (sessionStorage.getItem('user_data') === null) {
        alert('로그인 후 이용해주세요');
        window.location.href = '/Login';
        return;
    }
    //배열 자르기 함수
    const chunk = (data = [], size = 1) => {
        const arr = [];
        for (let i = 0; i < data.length; i += size) {
            arr.push(data.slice(i, i + size));
        }
        return arr;
    };
    //위에 버튼 눌렀을 때
    const nextSlide1 = () => {
        setMbtiList(mbtiList + Questions[num].a[0].type);
        setId(id + 1);
        setNum(num + 1);
        setCurrentPage(currentPage + 1);
    };
    //아래 버튼 눌렀을 때
    const nextSlide2 = () => {
        setMbtiList(mbtiList + Questions[num].a[1].type);
        setId(id + 1);
        setNum(num + 1);
        setCurrentPage(currentPage + 1);
    };
    let result = [];
    let i = 0;
    let s = 0;
    let t = 0;
    let p = 0;
    if (id === 13) {
        result = chunk(mbtiList, 1);
        for (let j = 0; j < 12; j++) {
            if (result[j] === 'I') {
                i += 1;
            } else if (result[j] === 'S') {
                s += 1;
            } else if (result[j] === 'T') {
                t += 1;
            } else if (result[j] === 'P') {
                p += 1;
            }
        }
        let final_mbti = [i >= 2 ? 'I' : 'E', s >= 2 ? 'S' : 'N', t >= 2 ? 'T' : 'F', p >= 2 ? 'P' : 'J'];
        const mbti = final_mbti.join('');
        navigate('/Result', { state: { id: { mbti } } });
    }
    return (
        <div className="mainLayout">
            <MainHeader />
            <div className="questionLayout">
                <div className="typequest_1">
                    <div className="mbtiTitle">
                        <div>여행 MBTI 테스트</div>
                        <div>{`${currentPage} / ${Questions.length}`}</div>
                    </div>
                    {Questions.map((data) => {
                        return (
                            <>
                                {data.id === id && (
                                    <div className="questionBox" key={data.id}>
                                        <div className="mbti_counter">
                                            <h1 className="questionTitle">
                                                Q{data.id}. {data.q}
                                            </h1>
                                        </div>
                                        <div className="answerLayout">
                                            <button type="button" className="answerButton" onClick={nextSlide1}>
                                                {data.a[0].text}
                                            </button>
                                            <br />
                                            <button type="button" className="answerButton" onClick={nextSlide2}>
                                                {data.a[1].text}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TravleTest;
