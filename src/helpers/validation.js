  /**
  * Check github profile name is not empty
  * and have only letters, numbers and -, _ char
  */
export const githubProfileValidation = (input) => {
  const profileRegex = /^[a-z0-9\-\_]+$/g;
  const value = input.val();
  
  input.removeClass('is-error');
  
  if (value === '' || !value.match(profileRegex)) {
    input.addClass('is-error');
    return false;
  }
  
  return true;
}
