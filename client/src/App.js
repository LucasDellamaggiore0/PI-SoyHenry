import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import LandingPage from './components/LandingPage/LandingPage'
import NewGame from './components/CreateGameForm/NewGame'
import Details from './components/GameDetails/Details';



function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/"  element={<LandingPage/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<Details/>} />
          <Route path="/newgame" element={<NewGame />} />
      </Routes>
    </div>
  );
}

export default App;
