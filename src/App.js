import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import sendMessage from './Components/sendMessage'



function App() {
  return (

    <Router>
            <Route exact path="/" component={HomePage} />
           
      <Route exact path="/sendMessage" component={sendMessage} />

    </Router>
  
    
  );
}

export default App;
