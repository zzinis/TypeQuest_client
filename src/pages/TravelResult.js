import Mbti from '../common/api/travelResult.json';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TravelResult.css';

function TravelResult() {
    const location = useLocation();
    const mbti = location.state.id;
    const navigate = useNavigate();

    const goReview = () => {
        navigate('/ReviewWrite');
    };
    const goChat = () => {
        navigate('/Chat');
    };
    return (
        <>
            <div className="Layout">
                <div className="resultLayout">
                    <div className="resultTitle">
                        <h2>님의 여행MBTI 결과는?</h2>
                    </div>
                    {Mbti.map((data) => {
                        return (
                            <>
                                {data.id === mbti.mbti && (
                                    <div className="resultShow">
                                        <p className="resultTitle">{data.id}</p>
                                        <p className="resultTitle">{data.nickname}</p>

                                        <img
                                            src={data.img}
                                            alt="mbti"
                                            width={'350px'}
                                            height={'350px'}
                                            className="img"
                                        />
                                        <ul className="description">
                                            <li className="exp">{data.description[0].exp}</li>
                                            <li className="exp">{data.description[1].exp}</li>
                                            <li className="exp">{data.description[2].exp}</li>
                                        </ul>
                                        <h1 className="travelTitle">추천하는 여행지는?</h1>
                                        <div className="recommend">
                                            <h2>{data.text}</h2>

                                            <img src={data.rec_img} alt="kk" className="rec_img" />
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
            </div>
        </>
    );
}

export default TravelResult;
