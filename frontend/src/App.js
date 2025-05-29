import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage'; // Create this if you haven't

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
