import { useState } from 'react';
import '../styles/YoutubeTest.scss';
import '../styles/TotalTest.scss';
import { useNavigate } from 'react-router-dom';
import Youtube_Q from '../common/api/youtubeQuestion.json';
import Footer from './Footer';
import MainHeader from './Header';
function YoutubeTest() {
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState(1);
    const [num, setNum] = useState(0);
    const [mbtiList, setMbtiList] = useState([]);
    const navigate = useNavigate();
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
        setMbtiList(mbtiList + Youtube_Q[num].a[0].type);
        setId(id + 1);
        setNum(num + 1);
        setCurrentPage(currentPage + 1);
    };
    //아래 버튼 눌렀을 때
    const nextSlide2 = () => {
        setMbtiList(mbtiList + Youtube_Q[num].a[1].type);
        setId(id + 1);
        setNum(num + 1);
        setCurrentPage(currentPage + 1);
    };
    //mbti 추출
    const resultMbti = () => {
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
            navigate('/YoutubeResult', { state: { id: { mbti } } });
        }
    };
    resultMbti();
    return (
        <div className="mainLayout">
            <MainHeader />
            <div className="questionLayout">
                <div className="typequest_1">
                    <div className="mbtiTitle">
                        <div>유튜브 MBTI 테스트</div>
                        <div>{`${currentPage} / ${Youtube_Q.length}`}</div>
                    </div>
                    {Youtube_Q.map((data) => {
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
                                            <div className="leftBox">
                                                <button type="button" className="answerLButton" onClick={nextSlide1}>
                                                    {data.a[0].text}
                                                </button>
                                            </div>
                                            <div className="rightBox">
                                                <button type="button" className="answerRButton" onClick={nextSlide2}>
                                                    {data.a[1].text}
                                                </button>
                                            </div>
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

export default YoutubeTest;
