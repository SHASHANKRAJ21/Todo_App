import React from 'react';
import './StatsBar.css';

function StatsBar({ todos }) {
  const total     = todos.length;
  const done      = todos.filter(t => t.completed).length;
  const pending   = total - done;
  const pct       = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="stats-bar">
      <div className="stats-cards">
        <div className="stat-card stat-card--total">
          <span className="stat-num">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card stat-card--pending">
          <span className="stat-num">{pending}</span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat-card stat-card--done">
          <span className="stat-num">{done}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      <div className="stats-progress">
        <div className="stats-progress-header">
          <span className="stats-progress-label">Overall Progress</span>
          <span className="stats-progress-pct">{pct}%</span>
        </div>
        <div className="stats-progress-track">
          <div
            className="stats-progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsBar;
