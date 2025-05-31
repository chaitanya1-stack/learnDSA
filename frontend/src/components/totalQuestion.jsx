import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api, { setAuthToken } from '../api';
import './totalQuestion.css';

import {
  CheckCircle,
  Bookmark,
  XCircle,
  List,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';

const BATCH_SIZE = 10;

const TotalQuestion = () => {
  const [problems, setProblems] = useState([]);
  const [displayedProblems, setDisplayedProblems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();

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
      const res = await api.get('/problems');
      setProblems(res.data);
      setDisplayedProblems(res.data.slice(0, BATCH_SIZE));
      setHasMore(res.data.length > BATCH_SIZE);
    } catch (err) {
      alert('Error fetching problems');
    }
  };

  const lastProblemRef = useCallback((node) => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreProblems();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore, displayedProblems, problems]);

  const loadMoreProblems = () => {
    const nextBatch = problems.slice(
      displayedProblems.length,
      displayedProblems.length + BATCH_SIZE
    );
    setDisplayedProblems((prev) => [...prev, ...nextBatch]);
    if (displayedProblems.length + nextBatch.length >= problems.length) {
      setHasMore(false);
    }
  };

  const toggleStatus = async (id, status, isActive) => {
    try {
      let payload = {};
      if (status === 'bookmark') payload = { bookmarked: !isActive };
      else if (status === 'solved') payload = { solved: !isActive };
      else if (status === 'unsolved') payload = { solved: isActive ? true : false };

      await api.patch(`/problems/${id}`, payload);
      fetchProblems(); // Refetch to update state
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredProblems = displayedProblems
    .filter((p) => {
      if (filter === 'solved') return p.status?.includes('solved');
      if (filter === 'unsolved') return !p.status?.includes('solved');
      if (filter === 'bookmarked') return p.status?.includes('bookmark');
      return true;
    })
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="problem-list">
      <h2>Problems</h2>

      {/* Search Input */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Buttons */}
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

      {/* Problem List */}
      {filteredProblems.length === 0 && <p>No problems found.</p>}
      {filteredProblems.map((problem, index) => {
        const isLast = index === filteredProblems.length - 1;
        return (
         <div
  key={problem._id}
  className="problem-card"
  ref={isLast ? lastProblemRef : null}
>
  {/* Left Side: Text Content */}
  <div className="problem-content">
    <div className="problem-title">{problem.title}</div>
    <div className="problem-meta">
      {problem.platform} | {problem.rated}
    </div>
    <div className="problem-topics">
      Topics: {problem.topics?.join(', ')}
    </div>
    <div className="problem-link">
      <a href={problem.link} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={16} /> View Problem
      </a>
    </div>
  </div>

  {/* Right Side: Toggle Buttons */}
  <div className="problem-buttons">
    <button
      className={problem.status?.includes('solved') ? 'solved' : ''}
      onClick={() => toggleStatus(problem._id, 'solved', problem.status?.includes('solved'))}
    >
      <CheckCircle size={14} /> Solved
    </button>
    <button
      className={problem.status?.includes('unsolved') ? 'unsolved' : ''}
      onClick={() => toggleStatus(problem._id, 'unsolved', problem.status?.includes('unsolved'))}
    >
      <XCircle size={14} /> Unsolved
    </button>
    <button
      className={problem.status?.includes('bookmark') ? 'bookmarked' : ''}
      onClick={() => toggleStatus(problem._id, 'bookmark', problem.status?.includes('bookmark'))}
    >
      <Bookmark size={14} /> {problem.status?.includes('bookmark') ? 'Bookmarked' : 'Bookmark'}
    </button>
  </div>
</div>

        );
      })}
    </div>
  );
};

export default TotalQuestion;
