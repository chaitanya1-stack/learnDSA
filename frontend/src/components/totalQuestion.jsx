import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api, { setAuthToken } from '../api';
import './totalQuestion.css';
import { CheckCircle, Bookmark, XCircle, List, ExternalLink, Search, Filter } from 'lucide-react';

const TotalQuestion = () => {
  const [allProblems, setAllProblems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Set filter from URL if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterFromURL = params.get('filter') || 'all';
    setFilter(filterFromURL);
  }, [location.search]);

  // Fetch problems from backend
  useEffect(() => {
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
      const response = await api.get('/problems');
      setAllProblems(response.data);
    } catch (err) {
      alert('Failed to load problems');
    }
  };

  // Handle toggle (bookmark / solved / unsolved)
  const updateStatus = async (id, type, currentState) => {
    const payload = {};

    if (type === 'bookmark') {
      payload.bookmarked = !currentState;
    } else if (type === 'solved') {
      payload.solved = !currentState;
    } else if (type === 'unsolved') {
      payload.solved = currentState ? true : false;
    }

    try {
      await api.patch(`/problems/${id}`, payload);
      fetchProblems(); // Refresh updated state
    } catch (err) {
      alert('Failed to update problem status');
    }
  };

  // Filter and search problems
  const filtered = allProblems.filter((problem) => {
    const matchesFilter =
      filter === 'solved' ? problem.status?.includes('solved') :
      filter === 'unsolved' ? !problem.status?.includes('solved') :
      filter === 'bookmarked' ? problem.status?.includes('bookmark') :
      true;

    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="problem-list">
      <h2>Problems</h2>

      {/* Search bar */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter buttons */}
      <div className="filter-buttons">
        <span className="filter-label"><Filter size={16} /> Filter:</span>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
          <List size={16} /> All
        </button>
        <button onClick={() => setFilter('solved')} className={filter === 'solved' ? 'active' : ''}>
          <CheckCircle size={16} /> Solved
        </button>
        <button onClick={() => setFilter('unsolved')} className={filter === 'unsolved' ? 'active' : ''}>
          <XCircle size={16} /> Unsolved
        </button>
        <button onClick={() => setFilter('bookmarked')} className={filter === 'bookmarked' ? 'active' : ''}>
          <Bookmark size={16} /> Bookmarked
        </button>
      </div>

      {/* Problem list */}
      {filtered.length === 0 ? <p>No problems found.</p> : null}
      {filtered.map((problem) => (
        <div key={problem._id} className="problem-card">
          <div className="problem-content">
            <div className="problem-title">{problem.title}</div>
            <div className="problem-meta">{problem.platform} | {problem.rated}</div>
            <div className="problem-topics">Topics: {problem.topics?.join(', ')}</div>
            <div className="problem-link">
              <a href={problem.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> View Problem
              </a>
            </div>
          </div>

          <div className="problem-buttons">
            <button
              className={problem.status?.includes('solved') ? 'solved' : ''}
              onClick={() => updateStatus(problem._id, 'solved', problem.status?.includes('solved'))}
            >
              <CheckCircle size={14} /> Solved
            </button>
            <button
              className={problem.status?.includes('unsolved') ? 'unsolved' : ''}
              onClick={() => updateStatus(problem._id, 'unsolved', problem.status?.includes('unsolved'))}
            >
              <XCircle size={14} /> Unsolved
            </button>
            <button
              className={problem.status?.includes('bookmark') ? 'bookmarked' : ''}
              onClick={() => updateStatus(problem._id, 'bookmark', problem.status?.includes('bookmark'))}
            >
              <Bookmark size={14} /> {problem.status?.includes('bookmark') ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalQuestion;
