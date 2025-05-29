import React, { useState } from 'react';
import './loginPage.css';


function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setMessage('Login successful (simulated)');
    } else {
      setMessage('Please fill in both fields');
    }
  };

  return (
    <div className= "completeBox">
    <form className="formbox" onSubmit={handleSubmit} >
        <div class="heading">
      <p class="already">already a user?</p> </div>
      <h1 className="login">Login</h1>
      <div>
      <input className="input email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        
      />
      <input className="input password"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
       
      />
      <button  className="login-btn" type="submit" style={{ width: '100%' }}>Login</button>
      <p>{message}</p>
      </div>
    </form>
    <div className="boldtext" ><span className="learnDSA">learnDSA</span> <span className="dot">Master Data Structures and Algorithms with curated problems, real-time progress tracking, and smart filters. LearnDSA helps you stay consistent, sharpen logic, and crack top tech interviews with confidence.</span> </div>
    <div className="new_here_create">
    <div className="new">
  new here? <a href="#" className="create">create an account</a>
   </div>
   </div>

    </div>

    
    
  );
}

export default LoginPage;
