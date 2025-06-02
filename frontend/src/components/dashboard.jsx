import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api, { setAuthToken } from '../api';
import './dashboard.css';
import { Link } from "react-router-dom";
import ProblemPieChart from './ProblemPieChart.jsx';
import VerticalProgressBar from './VerticalProgressBar.jsx';

const Dashboard = () => {
  const streak = localStorage.getItem("streak") || 0; 
  const [username, setUsername] = useState('');
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
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("lastVisit");
    let streak = Number(localStorage.getItem("streak")) || 0;

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (new Date(lastVisit).toDateString() === yesterday.toDateString()) {
        streak += 1;
      } else {
        streak = 1;
      }

      localStorage.setItem("streak", streak);
      localStorage.setItem("lastVisit", today);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUsername(user.username);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
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

  const total = problems.length;
  const solvedCount = problems.filter(p => p.status?.includes('solved')).length;
  const bookmarkedCount = problems.filter(p => p.status?.includes('bookmark')).length;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="fullcontainer">
      <div className="dashboard-layout">
        <div className="left-column">
          <div className="dashboardheaderdiv">
          <header className="dashboard-header">
            <div className="welcome-text">Welcome, <span className="topusername">{username}</span> !</div>
          </header>
          </div>

          <div className="taking_count">
            <div className="count-item"><i className="bi bi-database-check"></i> <span className="top">Total Questions Added : {total}</span></div>
            <div className="count-item"><i className="bi bi-bookmark-check-fill"></i> <span className="top">Bookmarked Questions : {bookmarkedCount}</span></div>
            <div className="count-item"><i className="bi bi-check-circle"></i> <span className="top">Solved Questions : {solvedCount}</span></div>
          </div>

          <div className="logout"><button className="logout-btn" onClick={handleLogout}>Logout</button></div>
        </div>

        <div className="center-column">
          <div className="add-question-container">
            <Link to="/addproblem">
              <button className="add-question-btn">Click here to add a new question</button>
            </Link>
          </div>
          <div className="description_add_buttondiv">
          <div className="description_add_button">
            Use the <span className="click_here">"Click here to add a new question"</span> button to log new DSA problems along with their links, topics, and status.
          </div>
          </div>

          <div className="boldtext1"><span className="learnDSA1">learnDSA</span></div>

          {/* ✅ Updated Navbar Links with query parameters */}
          <div className="navbar">
  
    <div className="nav-item"><Link className="nav-link" to="/totalquestions">All Problems</Link></div>
    <div className="nav-item"><Link className="nav-link" to="/totalquestions?filter=solved">Solved Problems</Link></div>
    <div className="nav-item"><Link className="nav-link" to="/totalquestions?filter=bookmarked">Bookmarked Problems</Link></div>
    <div className="nav-item"><Link className="nav-link" to="/totalquestions?filter=unsolved">Unsolved Problems</Link></div>
  
</div>


          <div className="streak-box">
            Current Streak: <strong className="streak">{streak} day(s)</strong> 🔥
          </div>
        </div>

        <div className="right-column">
          <div className="piechart"><ProblemPieChart total={total} solved={solvedCount} /></div>
          <div className="progress_bar"><VerticalProgressBar value={(solvedCount / total) * 100} /></div>
          <div className="percentage">Progress Percentage</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
