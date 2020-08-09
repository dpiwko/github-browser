export const getGithubProfile = (userName) => {
    return fetch(`https://api.github.com/users/${userName}`)
        .then((response) => response.json())
  }
  
export const getGithubHistory = (userName) => {
  return fetch(`https://api.github.com/users/${userName}/events/public?per_page=50`)
    .then((response) => response.json())
}
