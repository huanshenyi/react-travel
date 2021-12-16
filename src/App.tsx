import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/signin" exact component={SignInPage}/>
          <Route path="/register" exact component={RegisterPage}/>
          <Route path="/detail/:touristRouteId" exact component={DetailPage}/>
          <Route render={()=><h1>404 not found</h1>}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
