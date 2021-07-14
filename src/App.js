import logo from './logo.svg';
import './App.css';
import landingPage from './components/landingpage';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


function App() {
  return (
    <Router>
    <Route path="/" exact component={landingPage} />
    </Router>
  );
}

export default App;
