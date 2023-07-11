import YMbti from '../common/api/youtubeResult.json';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TotalResult.css';
import Footer from './Footer';
import MainHeader from './Header';

function YoutubeResult() {
    const location = useLocation();
    const mbti = location.state.id;
    const navigate = useNavigate();

    const goReview = () => {
        navigate('/Review');
    };
    const goChat = () => {
        navigate('/Chat');
    };
    return (
        <>
            <div className="Layout">
                <MainHeader />
                <div className="resultLayout">
                    <div className="resultTitle">
                        <h2 className="title1">
                            {' '}
                            <img src="image/youtube.png" alt="youtube" className="titleImg " /> 유튜브 MBTI 결과는?
                        </h2>
                    </div>
                    {YMbti.map((data) => {
                        return (
                            <>
                                {data.id === mbti.mbti && (
                                    <div className="resultShow">
                                        <p className="mbti">-{data.id}-</p>
                                        <p className="YoutubeN">{data.nickname}</p>

                                        <img
                                            src={data.img}
                                            alt="mbti"
                                            width={'350px'}
                                            height={'300px'}
                                            className="img"
                                        />
                                        <ul className="description">
                                            <li className="exp">{data.description[0].exp}</li>
                                            <li className="exp">{data.description[1].exp}</li>
                                            <li className="exp">{data.description[2].exp}</li>
                                        </ul>
                                        <h1 className="travelTitle">
                                            {' '}
                                            <img src="image/youtube1.png" alt="youtube" className="rImg" /> 추천하는
                                            유튜브 영상은?
                                        </h1>
                                        <div className="recommend1">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={data.video}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            ></iframe>
                                            <h4>출처:{data.text}</h4>
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })}
                    <div className="buttonLayout">
                        <div className="buttonBox">
                            <button type="button" className="share btn">
                                공유하기 <img src="image/share.png" alt="" width={'20px'} height={'20px'} />
                            </button>
                            <button type="button" className="review btn" onClick={goReview}>
                                리뷰쓰기 <img src="image/feedback.png" alt="" width={'23px'} height={'23px'} />
                            </button>
                            <button type="button" className="chat btn" onClick={goChat}>
                                채팅하기 <img src="image/chat.png" alt="" width={'20px'} height={'20px'} />
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default YoutubeResult;
