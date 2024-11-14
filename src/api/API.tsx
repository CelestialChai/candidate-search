const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const token = import.meta.env.VITE_GITHUB_TOKEN; // Correct way to access environment variables in Vite

    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Token ${token}`, // Use "Token" prefix for GitHub API
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub users: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in searchGithub:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN; // Correct way to access environment variables in Vite

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Token ${token}`, // Use "Token" prefix for GitHub API
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub user details: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in searchGithubUser:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };