import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage'; // Create this if you haven't
//import DashboardPage from './components/dashboardPage';
import Dashboard from './components/dashboard';
import  AddProblem from './components/addProblem';
import  TotalQuestion from './components/totalQuestion';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addproblem" element={<AddProblem />} />
        <Route path="/totalquestions" element={<TotalQuestion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
