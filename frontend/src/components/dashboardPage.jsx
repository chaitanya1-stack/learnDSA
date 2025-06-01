import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api, { setAuthToken } from '../api';
import './dashboardPage.css';

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
      navigate('/login'); // redirect if no token// changed the login
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
    navigate('/login');
  };
  // ==============================

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Problem Dashboard</h1>
        {/* ======= LOGOUT BUTTON ======= */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        {/* ============================= */}
      </div>

      <div className="dashboard-counts">
        Total: {total} | Solved: {solvedCount} | Bookmarked: {bookmarkedCount}
      </div>

      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'solved' ? 'active solved' : 'solved'}
          onClick={() => setFilter('solved')}
        >
          Solved
        </button>
        <button
          className={filter === 'bookmarked' ? 'active bookmarked' : 'bookmarked'}
          onClick={() => setFilter('bookmarked')}
        >
          Bookmarked
        </button>
      </div>

      <div className="add-problem-section">
        <h2>Add Problem</h2>
        <div className="input-grid">
          <input
            placeholder="Title"
            value={newProblem.title}
            onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
          />
          <input
            placeholder="Topics (comma separated)"
            value={newProblem.topics}
            onChange={(e) => setNewProblem({ ...newProblem, topics: e.target.value })}
          />
          <input
            placeholder="Rated"
            value={newProblem.rated}
            onChange={(e) => setNewProblem({ ...newProblem, rated: e.target.value })}
          />
          <input
            placeholder="Platform"
            value={newProblem.platform}
            onChange={(e) => setNewProblem({ ...newProblem, platform: e.target.value })}
          />
          <input
            placeholder="Link"
            value={newProblem.link}
            onChange={(e) => setNewProblem({ ...newProblem, link: e.target.value })}
          />
        </div>
        <button className="add-button" onClick={handleAddProblem}>
          Add Problem
        </button>
      </div>

      <div className="problem-list">
        <h2>Problems</h2>
        {filteredProblems.length === 0 && <p>No problems found.</p>}
        {filteredProblems.map((problem) => (
          <div key={problem._id} className="problem-card">
            <div className="problem-title">{problem.title}</div>
            <div className="problem-meta">
              {problem.platform} | {problem.rated}
            </div>
            <div className="problem-topics">
              Topics: {problem.topics?.join(', ')}
            </div>
            <div className="problem-buttons">
              <button
                className={problem.status?.includes('solved') ? 'solved' : ''}
                onClick={() => toggleStatus(problem._id, 'solved', problem.status?.includes('solved'))}
              >
                Solved
              </button>
              <button
                className={problem.status?.includes('unsolved') ? 'unsolved' : ''}
                onClick={() => toggleStatus(problem._id, 'unsolved', problem.status?.includes('unsolved'))}
              >
                Unsolved
              </button>
              <button
                className={problem.status?.includes('bookmark') ? 'bookmarked' : ''}
                onClick={() => toggleStatus(problem._id, 'bookmark', problem.status?.includes('bookmark'))}
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
