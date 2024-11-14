import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';

interface Candidate {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  location?: string;
  email?: string;
  company?: string;
}

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem("potentialCandidates") || "[]");
  });

  // Fetch the next candidate when the component mounts or a candidate is skipped/saved
  useEffect(() => {
    fetchNextCandidate();
  }, []);

  // Save potential candidates to localStorage whenever the list updates
  useEffect(() => {
    localStorage.setItem("potentialCandidates", JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);

  const fetchNextCandidate = async () => {
    const candidates = await searchGithub();
    if (candidates.length > 0) {
      setCurrentCandidate(candidates[0]); // Display the first candidate from the fetched list
    } else {
      setCurrentCandidate(null); // Show a message if no more candidates are available
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      setPotentialCandidates([...potentialCandidates, currentCandidate]);
      fetchNextCandidate();
    }
  };

  const skipCandidate = () => {
    fetchNextCandidate();
  };

  return (
    <div className="container">
      <h1 className="title">Candidate Search</h1>
      {currentCandidate ? (
        <div className="card">
          <div className="card-image">
            <figure className="image is-128x128">
              <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
            </figure>
          </div>
          <div className="card-content">
            <p className="title is-4">{currentCandidate.login}</p>
            <p><strong>Location:</strong> {currentCandidate.location || "N/A"}</p>
            <p><strong>Company:</strong> {currentCandidate.company || "N/A"}</p>
            <a href={currentCandidate.html_url} className="button is-link" target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
          <div className="buttons">
            <button className="button is-success" onClick={saveCandidate}>Save Candidate</button>
            <button className="button is-danger" onClick={skipCandidate}>Skip Candidate</button>
          </div>
        </div>
      ) : (
        <p className="notification is-danger">No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
