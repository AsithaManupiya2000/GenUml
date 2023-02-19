import './App.css';
import Signin from './pages/SignIn/SignIn.js';
import Home from './pages/Home/Home.js';
import Signup from './pages/Signup/Signup';
import UserInput from './pages/UserInput/UserInput';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/userRequirment" element={<UserInput />} />
      {/* <Route path="/sign-up" element={<SignUp />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;