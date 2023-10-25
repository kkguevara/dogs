import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Components/ComponentLanding/Landing";
import Create from "./Components/ComponentCreate/Create";
import Home from "./Components/ComponentHome/Home";
import Details from "./Components/ComponentDetails/Details";
import React, { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route path={"/create"} component={Create} />

          <Route
            path="/home"
            render={(routeProps) => (
              <Home
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                {...routeProps}
              />
            )}
          />
          <Route path={"/details/:id"} component={Details} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
