import React, { useEffect, useState } from 'react';
import { SavedCandidate } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<SavedCandidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p className="notification is-warning">No candidates have been saved yet.</p>
      ) : (
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <figure className="image is-48x48">
                    <img src={candidate.avatar_url} alt={candidate.name || candidate.login} />
                  </figure>
                </td>
                <td>{candidate.name || 'N/A'}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>
                  <span
                    className={`tag is-${candidate.status === 'Approved' ? 'success' : 'danger'}`}
                  >
                    {candidate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;