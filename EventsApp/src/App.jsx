import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'; 
import Home from './components/Home';  
import Header from './components/Header';
import SignInForm from './components/SignInForm';

function App() {
  return (
    <Router>
      <div>
      <Header />
        <h1>My React App</h1>
        <Routes>
          <Route path="/" element={<Home />} /> {}
          <Route path="/sign-in" element={<SignInForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
