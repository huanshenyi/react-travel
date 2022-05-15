import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
} from "./pages";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

// プライベートコンポネート
const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signIn" }} />
    );
  };
  return <Route render={routeComponent} {...rest} />;
};

function App() {
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signin" exact component={SignInPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/detail/:touristRouteId" exact component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
