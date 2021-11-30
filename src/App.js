import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';

const HomePage = lazy(() => import('./components/HomePage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));
const Navigation = lazy(() => import('./components/Navigation'));
const MoviesPage = lazy(() => import('./components/MoviesPage'));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}
