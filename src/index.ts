import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com',
});

type githubFoundUser = {
 login: string;
 id: number;
}

type githubUser = {
  login: string;
  id: number;
  followers: number;
}

(async () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/vnd.github+json',
    } as RawAxiosRequestHeaders,
  };
  const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
  try {
    const searchResponse: AxiosResponse = await client.get(`/search/users?${queryString}`, config);
    const foundUsers: githubFoundUser[] = searchResponse.data.items;

    const username: string = foundUsers[0].login;
    const userResponse: AxiosResponse = await client.get(`/users/${username}`, config);
    const user: githubUser = userResponse.data;
    const followersCount = user.followers;

    console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)
  } catch(err) {
    console.log(err);
  }  
})();
