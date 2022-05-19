import { Rating } from "./Rating";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "./global";

export function Movielist() {
  const history = useHistory();

  const [movielist, setMovielist] = useState([]);

  const getMovies = () => {
    fetch(`${API}/movies`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((mvs) => setMovielist(mvs));
  };


  //delete the movie and refresh the data(movies)

  // Delete movie -> Refresh data
  const deleteMovie = (_id) => {
    fetch(`${API}/movies/${_id}`, {
      method: "DELETE",
    }).then(() => getMovies());
  };
  useEffect(() => getMovies(), []);
  return (
    <div className="movie">
      {movielist.map(
        (
          { name, poster, cast, genre, summary, director, rating, _id },
          index
        ) => (
          <Rating
            //{...prop}
            key={index}
            name={name}
            poster={poster}
            cast={cast}
            genre={genre}
            summary={summary}
            director={director}
            rating={rating}
            deletebutton={
              <IconButton
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  deleteMovie(_id);
                  console.log(_id);
                }}
                color="error"
                aria-label="delete"
                size="medium"
              >
                <DeleteIcon />
              </IconButton>
            }
            editbutton={
              <IconButton
                color="secondary"
                onClick={() => history.push(`/movies/edit/${_id}`)}
                aria-label="edit"
                size="medium"
              >
                <EditIcon />
              </IconButton>
            }
            id={_id}
          />
        )
      )}
    </div>
  );
}
