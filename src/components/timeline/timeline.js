import $ from 'cash-dom';

/**
 * Check event type and append the right event to user timeline
 *
 * @param {object} history - object with history of events for github profile
 */
const timeline = (history) => {
  const userTimeline = $('#user-timeline');
  userTimeline.empty();

  for (event of history) {
    switch (event.type) {
      case 'PullRequestEvent':
        userTimeline.append(generatePullRequestEvent(event));
        break;
      case 'PullRequestReviewCommentEvent':
        userTimeline.append(generatePullRequestReviewCommentEvent(event));
        break;
    }
  }
};

/**
 * Generate timeline element with date, profile info and event content
 *
 * @param {object} data - object with history
 * @param {HTML} content - html to display in timeline
 */
const generateTimeline = (data, content) => {
  const user = data.payload.pull_request.user;
  const repo = data.repo;
  const dateCreated = new Date(data.created_at).toLocaleDateString('en-EN');
  
  return `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <p class="heading date">
          ${dateCreated}
        </p>
        <div class="content">
          <span class="gh-username">
            <img src="${user.avatar_url}" />
            <a href="${user.html_url}">
              ${user.login}
            </a>
          </span>
          ${data.payload.action}
          
          ${content}
          
          <p class="repo-name">
            <a href="https://github.com/${repo.name}">
              ${repo.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create content for pull request event and pass to generate timeline
 *
 * @param {object} data - object with events history data
 */
const generatePullRequestEvent = (data) => {
  const pullRequest = data.payload.pull_request;
  const content = `
    <a href='${pullRequest._links.html.href}'>pull request</a>
  `;
  
  return generateTimeline(data, content);
};

/**
 * Create content for pull request CR event and pass to generate timeline
 *
 * @param {object} data - object with events history data
 */
const generatePullRequestReviewCommentEvent = (data) => {
  const comment = data.payload.comment;
  const pullRequest = data.payload.pull_request;
  const content = `
    <a href="${comment._links.html.href}">
      comment
    </a>
    to
    <a href="${pullRequest._links.html.href}">
      pull request
    </a>
  `;
  
  return generateTimeline(data, content);
};

export default timeline;
