import "./App.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { Movielist } from "./Movielist";
import { Homepage } from "./Homepage";
import { NotFound } from "./NotFound";
import { Addmovie } from "./Addmovie";
import { Moviedetails } from "./Moviedetails";
import { Updatemovie } from "./Updatemovie";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import MovieIcon from "@mui/icons-material/Movie";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CasinoIcon from "@mui/icons-material/Casino";

export default function App() {
  //  const [movielist,setMovielist]=useState(INITIAL_MOVIE_LIST);

  const history = useHistory();

  const array = [
    {
      name: <div>HOME</div>,
      onClick: "/",
      icon: <HomeIcon />,
    },
    {
      name: <div>MOVIES</div>,
      onClick: "/movies",
      icon: <VideoCameraBackIcon />,
    },
    {
      name: <div>ADD MOVIE</div>,
      onClick: "/movies/add",
      icon: <MovieIcon />,
    }
    
  ];

  const [mode, setMode] = useState("dark");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              history.push(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ borderRadius: "0px", minHeight: "100vh" }} elevation={4}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
                            {["left"].map((anchor) => (
                <Fragment key={anchor}>
                  <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon />
                    Menu
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}
              <Button
                color="inherit"
                style={{ marginLeft: "auto" }}
                startIcon={
                  mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode === "light" ? "dark" : "light"} Mode
              </Button>
            </Toolbar>
          </AppBar>
          <div className="route-container">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/films">
                <Redirect to="/movies" />
              </Route>
              <Route path="/movies/add">
                <Addmovie />
              </Route>
              <Route path="/movies/edit/:id">
                <Updatemovie />
              </Route>
              <Route path="/movies/:filmid">
                <Moviedetails />
              </Route>
              <Route path="/movies">
                <Movielist />
              </Route>
             <Route path="**">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
