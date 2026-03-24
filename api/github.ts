import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Get the token securely from the server environment
  const token = process.env.GITHUB_TOKEN;
  
  const GITHUB_USERNAME = "Poojith-007";
  
  let endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json'
  };

  // If a token exists, use the authenticated endpoint to get ALL repos (including private/org)
  if (token) {
    endpoint = `https://api.github.com/user/repos?sort=updated&affiliation=owner&per_page=6`;
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Only send the necessary data to the frontend to minimize payload and prevent leaking other internal GitHub data
    const cleanedData = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      html_url: repo.html_url,
      homepage: repo.homepage
    }));

    return res.status(200).json(cleanedData);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch repositories." });
  }
}
