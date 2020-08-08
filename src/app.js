import $ from 'cash-dom';
import './assets/scss/app.scss';
import { githubProfileValidation } from './helpers/validation';
import { getGithubProfile, getGithubHistory } from './services/githubServices';
import timelineGenerator from './components/timeline/timeline';

export class App {
  initializeApp() {
    const loader = $('.loader');
    
    $('.load-username').on('click', () => {
      const userNameInput = $('.username.input');
      const userName = userNameInput.val();

      /**
       * If github profile name is not valid escape and don't send fetch
       */
      if (!githubProfileValidation(userNameInput)) {
        return false;
      }
      
      loader.removeClass('is-hidden');

      getGithubProfile(userName)
        .then((data) => {
          this.updateProfile(data);
          getGithubHistory(userName)
            .then((data) => {
              this.updateHistory(data);
            })
            .finally(() => {
              loader.addClass('is-hidden');
            });
        });
    });
  }

  /**
   * Update information about github profile like name, url, avatar, bio
   *
   * @param {object} profile - object with profile information
   */
  updateProfile(profile) {
    $('#profile-name').text(profile.login);
    $('#profile-image').attr('src', profile.avatar_url);
    $('#profile-url').attr('href', profile.html_url).text(`@${profile.login}`);
    $('#profile-bio').text(profile.bio || '(no information)');
  }
  
  /**
   * Update history timeline with profile events
   *
   * @param {object} history - object with history events of github profile
   */
  updateHistory(history) {
    timelineGenerator(history);
  }
}
