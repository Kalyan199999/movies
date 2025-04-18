// import { ToastContainer} from 'react-toastify';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react'

import Navbar from "./components/Navbar";

import Loader from './pages/Loader';

const Home = lazy(() => import('./pages/Home'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));

const App = ()=>{

  const handleSearch = (query) => {
    console.log("Search for:", query);
  };

  return (
    <>
        <Router>

          <Navbar onSearch={handleSearch} />

          <Suspense fallback={<Loader />}>

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />

            </Routes>

          </Suspense>

        </Router>
    </>
  )
}

export default App;