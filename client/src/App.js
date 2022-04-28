import './App.css';
import {Routes, Route} from 'react-router-dom';
import Details from './components/GameDetails/Details'
import Home from './components/Home/Home.jsx'
import LandingPage from './components/LandingPage/LandingPage'
import NewGame from './components/CreateGameForm/NewGame'



function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/"  element={<LandingPage/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/newgame" element={<NewGame />} />
      </Routes>
    </div>
  );
}

export default App;
