import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api, { setAuthToken } from '../api';
import './addProblem.css';

const AddProblem = () => {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({
    title: '',
    topics: '',
    rated: '',
    platform: '',
    link: '',
  });

  const [notification, setNotification] = useState(''); // new state for notifications

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
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

      // Show success notification
      setNotification('Problem added successfully!');
      setTimeout(() => setNotification(''), 3000); // Clear after 3 seconds
    } catch (err) {
      alert('Failed to add problem');
    }
  };

  return (
    <div className="add-problem-page">
      <div className="header">
        
        <div className="logo">learnDSA</div>
      
      </div>

      <div className="add-problem-section">
        <h2>Add Problem</h2>
        {notification && <div className="notification">{notification}</div>}
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
            placeholder="Rated (optional)"
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
    </div>
  );
};

export default AddProblem;
