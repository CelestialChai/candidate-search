import React, { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { Card, Media, Image, Content, Button, Heading } from 'react-bulma-components';

type SavedCandidate = Candidate & { status: 'Approved' | 'Rejected' };

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<SavedCandidate[]>(() => {
    return JSON.parse(localStorage.getItem("potentialCandidates") || "[]");
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await searchGithub();
      setCandidates(fetchedCandidates);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    localStorage.setItem("potentialCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const saveCandidate = () => {
    if (candidates[currentCandidateIndex]) {
      const approvedCandidate: SavedCandidate = {
        ...candidates[currentCandidateIndex],
        status: 'Approved',
        };
      setSavedCandidates([...savedCandidates, approvedCandidate]);
      goToNextCandidate();
    }
  };

  const skipCandidate = () => {
    if (candidates[currentCandidateIndex]) {
      const rejectedCandidate: SavedCandidate = {
        ...candidates[currentCandidateIndex],
        status: 'Rejected',
      };
      setSavedCandidates([...savedCandidates, rejectedCandidate]);
      goToNextCandidate();
    }
  };


  const goToNextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      setCandidates([]);
    }
  };

  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div className="container">
      {currentCandidate ? (
        <Card className="mb-4">
          <Card.Image size="4by3" src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <Card.Content>
            <Media>
              <Media.Item align="left">
                <Image size={48} src={currentCandidate.avatar_url} alt="Profile image" />
              </Media.Item>
              <Media.Item>
                <Heading size={4}>{currentCandidate.name || currentCandidate.login}</Heading>
                <Heading subtitle size={6}>@{currentCandidate.login}</Heading>
              </Media.Item>
            </Media>
            <Content>
              <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
              <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
              <p>{currentCandidate.bio || 'No bio available.'}</p>
              <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
              </a>
            </Content>
          </Card.Content>
          <div className="buttons">
            <Button color="success" onClick={saveCandidate}>+</Button>
            <Button color="danger" onClick={skipCandidate}>-</Button>
          </div>
        </Card>
      ) : (
        <p className="notification is-warning">No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;