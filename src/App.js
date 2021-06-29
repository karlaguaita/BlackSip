import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainScreen from "./mainScreen"

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <MainScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}