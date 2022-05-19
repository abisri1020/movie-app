import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useHistory } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import Badge from "@mui/material/Badge";

export function Rating(
  {
    name,
    poster,
    genre,
    summary,
    director,
    rating,
    deletebutton,
    editbutton,
    id,
  },
  index
) {
  const [dislike, setdislike] = useState(0);
  const [like, setlike] = useState(0);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const styles = {
    color: rating > 8.5 ? "green" : "red",
  };
  return (
    <Card className="movie-container">
      <CardContent>
        <img src={poster} id="res" className="poster" alt="pics" />

        <h2>Movie : {name}</h2>
        <div style={{ width: "350px" }}>
          <IconButton
            color="success"
            aria-label="toggle-summary"
            onClick={() => setShow((s) => !s)}
          >
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          {show ? (
            <div>
              <p>
                <b>Genre :</b> {genre}
              </p>
              <p>
                <b>Summary :</b>
                {summary}
              </p>
            </div>
          ) : (
            ""
          )}
          <IconButton
            color="primary"
            variant="outlined"
            onClick={() => history.push(`/movies/${id}`)}
          >
            <InfoIcon />
          </IconButton>
        </div>

        <p style={styles}>Rating : ⭐{rating}</p>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          aria-label="like-button"
          onClick={() => setlike(like + 1)}
        >
          <Badge badgeContent={like} color="primary">
            👍
          </Badge>
        </IconButton>
        <IconButton
          color="error"
          aria-label="dislike-button"
          onClick={() => setdislike(dislike + 1)}
        >
          <Badge badgeContent={dislike} color="error">
            👎
          </Badge>
        </IconButton>
        {deletebutton}
        {editbutton}
      </CardActions>
    </Card>
  );
}
