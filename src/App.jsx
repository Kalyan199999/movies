import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react'

import Navbar from "./components/Navbar";

import Loader from './pages/Loader';

const Home = lazy(() => import('./pages/Home'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));

const TrendingMovies = lazy(() => import('./pages/TrendingMovies'));
const UpcomingMovies = lazy(() => import('./pages/UpcomingMovies'));


<Route path="/trending" element={<TrendingMovies />} />


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
              <Route path='/popular' element={<PopularMovies />} />
              <Route path='/trending' element={<TrendingMovies />} />
              <Route path='/upcoming' element={<UpcomingMovies />} />
            </Routes>

          </Suspense>

        </Router>
    </>
  )
}

export default App;