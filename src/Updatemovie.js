import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { API } from "./global";
import { movieValidationSchema } from "./Addmovie";
import { useFormik } from "formik";

export function Updatemovie() {
  const { id } = useParams();
  // console.log(id, movielist);
  // const movie = movielist[id];

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${API}/movies/${id}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json()) //Response Object
      .then((mvs) => setMovie(mvs))
      .catch((err) => console.log(err));
  }, [id]);
  return <div>{movie ? <Save movie={movie} /> : <h2>Loading</h2>}</div>;
}

// 1. method must be put method
//2. body - JSON data
//3. headers - JSON data
// After POST is complete -> movie t0 /movies

function Save({ movie }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: movie.name,
      poster: movie.poster,
      rating: movie.rating,
      summary: movie.summary,
      trailer: movie.trailer,
      cast: movie.cast,
      genre: movie.genre,
      direct: movie.director,
    },
    validationSchema: movieValidationSchema,
    onSubmit: (UpdatedMovie) => {
      editMovie(UpdatedMovie);
    },
  });

  const editMovie = (UpdatedMovie) => {
    console.log("Updated", UpdatedMovie);
    fetch(`${API}/movies/${movie._id}`, {
      method: "PUT",
      body: JSON.stringify(UpdatedMovie),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/movies"));
    //setMovielist([...movielist, newMovie]);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1>Here you can Edit your favourite movies</h1>
      <TextField
        className="text"
        label="Movie Name"
        variant="outlined"
        margin="dense"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
      />
      <TextField
        className="text"
        label="Poster"
        variant="outlined"
        margin="dense"
        id="poster"
        name="poster"
        onChange={formik.handleChange}
        value={formik.values.poster}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && formik.errors.poster}
        helperText={
          formik.touched.poster && formik.errors.poster
            ? formik.errors.poster
            : ""
        }
      />
      <TextField
        className="text"
        label="Cast"
        variant="outlined"
        margin="dense"
        id="cast"
        name="cast"
        onChange={formik.handleChange}
        value={formik.values.cast}
        onBlur={formik.handleBlur}
        error={formik.touched.cast && formik.errors.cast}
        helperText={
          formik.touched.cast && formik.errors.cast ? formik.errors.cast : ""
        }
      />
      <TextField
        className="text"
        label="Genre"
        variant="outlined"
        margin="dense"
        id="genre"
        name="genre"
        onChange={formik.handleChange}
        value={formik.values.genre}
        onBlur={formik.handleBlur}
        error={formik.touched.genre && formik.errors.genre}
        helperText={
          formik.touched.genre && formik.errors.genre ? formik.errors.genre : ""
        }
      />
      <TextField
        className="text"
        label="Summary"
        variant="outlined"
        margin="dense"
        id="summary"
        name="summary"
        onChange={formik.handleChange}
        value={formik.values.summary}
        onBlur={formik.handleBlur}
        error={formik.touched.summary && formik.errors.summary}
        helperText={
          formik.touched.summary && formik.errors.summary
            ? formik.errors.summary
            : ""
        }
      />
      <TextField
        className="text"
        label="Director Name"
        variant="outlined"
        margin="dense"
        id="direct"
        name="direct"
        onChange={formik.handleChange}
        value={formik.values.direct}
        onBlur={formik.handleBlur}
        error={formik.touched.direct && formik.errors.direct}
        helperText={
          formik.touched.direct && formik.errors.direct
            ? formik.errors.direct
            : ""
        }
      />
      <TextField
        className="text"
        label="Rating"
        variant="outlined"
        margin="dense"
        id="rating"
        name="rating"
        onChange={formik.handleChange}
        value={formik.values.rating}
        onBlur={formik.handleBlur}
        error={formik.touched.rating && formik.errors.rating}
        helperText={
          formik.touched.rating && formik.errors.rating
            ? formik.errors.rating
            : ""
        }
      />
      <TextField
        className="text"
        label="Trailer"
        variant="outlined"
        margin="dense"
        id="trailer"
        name="trailer"
        onChange={formik.handleChange}
        value={formik.values.trailer}
        onBlur={formik.handleBlur}
        error={formik.touched.trailer && formik.errors.trailer}
        helperText={
          formik.touched.trailer && formik.errors.trailer
            ? formik.errors.trailer
            : ""
        }
      />
      <Button variant="contained" type="submit" color="success">
        Update Movie
      </Button>
    </form>
  );
}
