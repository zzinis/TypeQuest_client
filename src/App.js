import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import MbtiPage from './pages/MbtiPage';
import TravleTest from './pages/TravelTest';
import TravelResult from './pages/TravelResult';
import Login from './pages/Login';
import Join from './pages/Join';
import GlobalStyle from './components/GlobalStyle';
import Chat from './pages/Chat';
import ChatLogin from './pages/ChatLogin';
import ReviewWrite from './pages/ReviewWrite';

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/Login" element={<Login />}></Route>
                    <Route path="/Join" element={<Join />}></Route>
                    <Route path="/MbtiPage" element={<MbtiPage />}></Route>
                    <Route path="/ChatLogin" element={<ChatLogin />}></Route>
                    <Route path="/Chat" element={<Chat />}></Route>
                    <Route path="/TravelTest" element={<TravleTest />} />
                    <Route path="/Result" element={<TravelResult />} />
                    <Route path="/ReviewWrite" element={<ReviewWrite />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
