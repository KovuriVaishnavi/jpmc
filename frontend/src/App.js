import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
class App extends React.Component {

  render() {
    return (
      <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
         </Routes>
      </Router>
      </>
    )
  }
}

export default App;