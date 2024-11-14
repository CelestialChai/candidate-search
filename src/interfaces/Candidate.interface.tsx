// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
  html_url: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
  followers?: number;
  following?: number;
}
export interface SavedCandidate extends Candidate {
  status: 'Approved' | 'Rejected';
}

