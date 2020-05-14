import '@babel/polyfill';
import { signIn, signOut } from './signIn';

// DOM ELEMENTS
const loginForm = document.querySelector('form');
const logOutBtn = document.querySelector('#signout');

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
