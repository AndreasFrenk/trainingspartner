import logo from './logo.svg';
import './App.css';
import landingPage from './components/landingpage';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Profile from './components/profile';


function App() {
  return (
    <Router>
    <Route path="/" exact component={landingPage} />
    <Route path="/profile" exact component={Profile} />
    </Router>
  );
}

export default App;
