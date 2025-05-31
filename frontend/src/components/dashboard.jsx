import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api, { setAuthToken } from '../api';
import './dashboard.css';
import { Link } from "react-router-dom";
import ProblemPieChart from './ProblemPieChart.jsx'; // adjust path if needed

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({
    title: '',
    topics: '',
    rated: '',
    platform: '',
    link: '',
  });

  const [filter, setFilter] = useState('all');
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // redirect if no token// changed the login
      return;
    }
    setAuthToken(token);
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await api.get('/problems');
      setProblems(res.data);
    } catch (err) {
      alert('Error fetching problems');
    }
  };

  const handleAddProblem = async () => {
    try {
      const problemData = {
        ...newProblem,
        topics: newProblem.topics
          .split(',')
          .map((topic) => topic.trim())
          .filter(Boolean),
      };

      await api.post('/problems', problemData);
      setNewProblem({ title: '', topics: '', rated: '', platform: '', link: '' });
      fetchProblems();
    } catch (err) {
      alert('Failed to add problem');
    }
  };

  const toggleStatus = async (id, status, isActive) => {
    try {
      let payload = {};
      if (status === 'bookmark') {
        payload = { bookmarked: !isActive };
      } else if (status === 'solved') {
        payload = { solved: !isActive };
      } else if (status === 'unsolved') {
        payload = { solved: isActive ? true : false };
      }

      await api.patch(`/problems/${id}`, payload);
      fetchProblems();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredProblems = problems.filter((p) => {
    if (filter === 'solved') return p.status?.includes('solved');
    if (filter === 'bookmarked') return p.status?.includes('bookmark');
    return true;
  });

  const total = problems.length;
  const solvedCount = problems.filter(p => p.status?.includes('solved')).length;
  const bookmarkedCount = problems.filter(p => p.status?.includes('bookmark')).length;

  // ======= LOGOUT FEATURE =======
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  // ==============================

  return (
    <div className="fullcontainer">
      {/* Header with Welcome and Logout */}
      <header className="dashboard-header">
        <div className="welcome-text">Welcome, User</div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      {/* Title */}
      <div className="boldtext1">
        <span className="learnDSA1">learnDSA</span>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="/totalquestions">All Problems</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Solved Problems</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Bookmarked Problems</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Unsolved Problems</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/*  Question Button */}
      

<div className="add-question-container">
  <Link to="/addproblem">
    <button className="add-question-btn">+ Add Question</button>
  </Link>
</div>



      {/* Pie Chart */}
      <ProblemPieChart className="pie" total={total} solved={solvedCount} />
    </div>
  );
};

export default Dashboard;
