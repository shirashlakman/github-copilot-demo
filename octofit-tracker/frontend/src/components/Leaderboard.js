import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        return response.json();
      })
      .then(data => {
        // Sort by score in descending order
        const sortedData = data.sort((a, b) => b.score - a.score);
        setLeaderboard(sortedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-3" role="alert">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="component-text text-center mb-4">Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col" className="text-center">Rank</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td className="text-center">
                  <span className={`badge ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-success' : 'bg-primary'}`}>
                    {index + 1}
                  </span>
                </td>
                <td><strong>{entry.user?.username || 'N/A'}</strong></td>
                <td>{entry.user?.email || 'N/A'}</td>
                <td className="text-center"><span className="badge bg-success fs-6">{entry.score}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
