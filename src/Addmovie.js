import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { API } from "./global";
import { useFormik } from "formik";
import * as yup from "yup";

export const movieValidationSchema = yup.object({
  name: yup.string().required("Why not fill this name? 😉"),
  poster: yup
    .string()
    .required("Why not fill this password? 😉")
    .min(4, "Need a longer password 😄"),
  rating: yup.number().min(0).max(10).required("Why not fill this rating? 😉"),
  summary: yup.string().required("Why not fill this summary? 😉").min(20),
  trailer: yup.string().required("Why not fill this trailer? 😉").min(4),
  genre: yup.string().required("Why not fill this genre? 😉").min(4),
  cast: yup.string().required("Why not fill this cast? 😉").min(5),
  direct: yup.string().required("Why not fill this cast? 😉").min(5),
});

export function Addmovie() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      rating: "",
      summary: "",
      trailer: "",
      cast: "",
      genre: "",
      direct: "",
    },
    validationSchema: movieValidationSchema,
    onSubmit: (newMovie) => {
      addMovie(newMovie);
    },
  });

  const addMovie = (newMovie) => {
    console.log("onSubmit", newMovie);
    fetch(`${API}/movies/`, {
      method: "POST",
      body: JSON.stringify([newMovie]),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/movies"));
  };
  //setMovielist([...movielist, newMovie]);
  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1>Here you can add your favourite movies</h1>
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
      <Button variant="contained" type="submit">
        Add Movie
      </Button>
    </form>
  );
}

// name - required
// poster - min 4, required
// rating - 0 - 10, required
// summary - min 20 chars, required
// trailer -min 4, required
