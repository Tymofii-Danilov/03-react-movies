import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    setMovies([]);

    try {
      const response: Movie[] = await fetchMovies(query);
      if (response.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(response);
      console.log(response);
    } catch {
      setIsError(true);
      toast("Error, try again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
