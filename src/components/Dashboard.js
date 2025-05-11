import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    lastLogin: new Date().toLocaleString()
  });
  const [stats, setStats] = useState({
    totalVisits: 156,
    activeProjects: 3,
    notifications: 5
  });

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetchUserDataAPI();
        // setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, {userData.name}</h1>
          <p className="user-email">{userData.email}</p>
          <p className="last-login">Last login: {userData.lastLogin}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Visits</h3>
          <p className="stat-number">{stats.totalVisits}</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p className="stat-number">{stats.activeProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Notifications</h3>
          <p className="stat-number">{stats.notifications}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <div className="activity-details">
                <p>Updated project documentation</p>
                <small>2 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📊</span>
              <div className="activity-details">
                <p>Generated monthly report</p>
                <small>5 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">👥</span>
              <div className="activity-details">
                <p>Team meeting completed</p>
                <small>1 day ago</small>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-button">
              <span className="action-icon">📋</span>
              New Project
            </button>
            <button className="action-button">
              <span className="action-icon">📊</span>
              View Reports
            </button>
            <button className="action-button">
              <span className="action-icon">⚙️</span>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 