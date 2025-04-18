import { BrowserRouter as Router, Routes, Route ,useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react'

import Navbar from "./components/Navbar";

import Loader from './pages/Loader';

const Home = lazy(() => import('./pages/Home'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));
const TrendingMovies = lazy(() => import('./pages/TrendingMovies'));
const UpcomingMovies = lazy(() => import('./pages/UpcomingMovies'));
const Genres = lazy(() => import('./pages/Genres'));
const GenreMovies = lazy(()=>import('./pages/GenreMovies')); 
const SearchPage = lazy(()=>import('./pages/SearchPage'));

const App = ()=>{


  return (
    <>
        <Router>

          <Navbar  />

          <Suspense fallback={<Loader />}>

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path='/popular' element={<PopularMovies />} />
              <Route path='/trending' element={<TrendingMovies />} />
              <Route path='/upcoming' element={<UpcomingMovies />} />
              <Route path='/genres' element={<Genres />} />
              <Route path="/genre/:genreId" element={<GenreMovies />} />
              <Route path="/search" element={<SearchPage />} />

            </Routes>

          </Suspense>

        </Router>
    </>
  )
}

export default App;