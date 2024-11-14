import React, { useEffect, useState } from 'react';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  location?: string;
  email?: string;
  company?: string;
}

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved candidates from localStorage
    const candidates = JSON.parse(localStorage.getItem("potentialCandidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p className="notification is-warning">No candidates have been accepted</p>
      ) : (
        savedCandidates.map((candidate) => (
          <article className="media box" key={candidate.id}>
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={candidate.avatar_url} alt={candidate.login} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{candidate.login}</strong> <small>@{candidate.login}</small>
                  <br />
                  Location: {candidate.location || "N/A"}
                  <br />
                  <a href={candidate.html_url} className="button is-small is-link" target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                </p>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;
