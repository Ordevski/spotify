import { useContext } from 'react'
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import { Router } from 'react-router-dom';

const App = () => {
  return (
    // <Router>
      <div className='h-screen bg-black'>
        <div className="h-[90%] flex">
          <Sidebar />
          <Player />
        </div>
      </div>
    // </Router>
  );
}

export default App;