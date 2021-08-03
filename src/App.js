import React, { lazy, Suspense } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  makeStyles,
} from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Main = lazy(() => import("./components/Main/Main"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const ContentDetails = lazy(() =>
  import("./components/Content/ContentDetails")
);

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(69, 217, 226, 1)",
      light: "rgba(142, 255, 102, 1)",
      dark: "rgba(32, 124, 232, 1)",
    },
    secondary: {
      main: "rgba(226, 69, 69, 1)",
      light: "rgba(255, 102, 102)",
    },
    neutrals: {
      main: "rgba(224, 224, 224, 1)",
      light: "rgba(242, 242, 242, 1)",
      dark: "rgba(64, 58, 58, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
      disabled: "rgba(0, 0, 0, .12)",
    },
  },
  shadows: [
    "none",
    "0px 0px 10px rgba(0, 0, 0, .25)",
    "2px 2px 4px rgba(142, 255, 102,.25)",
    "2px 2px 4px rgba(32, 124, 232,.25)",
    "2px 2px 4px rgba(226, 69, 69,.25)",
  ],
  shape: {
    borderRadiusFive: 5,
    borderRadiusTen: 10,
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.container}>
          <Suspense fallback={`loading...`}>
            <Switch>
              {/* <Route exact path="/">
                <Redirect to="/signin" />
              </Route> */}
              <Route exact path="/" component={Main} />
              <Route exact path="/:cat/:sub/:id" component={ContentDetails} />
              <Route exact path="/category/:cat" component={Main} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/:auth" component={Auth} />
            </Switch>
          </Suspense>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const useStyles = makeStyles({
  container: {
    padding: 0,
  },
});

export default App;
