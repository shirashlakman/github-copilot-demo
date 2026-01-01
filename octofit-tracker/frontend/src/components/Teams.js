import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/teams/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-3" role="alert">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="component-text text-center mb-4">Teams</h1>
      <div className="row">
        {teams.map(team => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header text-white" style={{ backgroundColor: '#4682b4' }}>
                <h5 className="card-title mb-0 fw-bold">{team.name}</h5>
              </div>
              <div className="card-body">
                <h6 className="mb-3">Members:</h6>
                <ul className="list-group list-group-flush">
                  {team.members && team.members.length > 0 ? (
                    team.members.map(member => (
                      <li key={member._id} className="list-group-item">
                        <strong>{member.username}</strong> <span className="text-muted">({member.email})</span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No members yet</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
