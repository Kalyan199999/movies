import { ToastContainer} from 'react-toastify';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";

import Home from './pages/Home';

const App = ()=>{

  const handleSearch = (query) => {
    console.log("Search for:", query);
    // Trigger your API search here
  };

  return (
    <>
        <Router>
          <ToastContainer />
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
    </>
  )
}

export default App;