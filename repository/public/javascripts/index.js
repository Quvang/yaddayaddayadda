import '@babel/polyfill';
import { signIn, signOut } from './signIn';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const loginForm = document.getElementById('formSignIn');
const logOutBtn = document.querySelector('#signout');
const userDataForm = document.getElementById('formUpdateUser');
const userPasswordForm = document.getElementById('formUpdateUserPassword');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signIn(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', signOut);

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('inputUsername').value;
    const email = document.getElementById('inputEmail').value;
    const firstName = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastName').value;

    await updateSettings({ username, email, firstName, lastName }, 'data');

    document.getElementById('labelUsername').textContent = 'Username: ' + username;
    document.getElementById('labelEmail').textContent = 'Email address: ' + email;
    document.getElementById('labelFirstName').textContent = 'First Name: ' + firstName;
    document.getElementById('labelLastName').textContent = 'Last Name: ' + lastName;
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('btnSavePassword').value = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.getElementById('btnSavePassword').value = 'Change password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
