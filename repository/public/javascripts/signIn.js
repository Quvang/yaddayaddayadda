import axios from 'axios';
import { showAlert } from './alerts';

export const signUp = async (username, password, passwordConfirm, email, firstName, lastName) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signUp',
      data: {
        username,
        password,
        passwordConfirm,
        email,
        firstName,
        lastName,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Account Created - Please Check your email to confirm your new account`);
      window.setTimeout(() => {
        location.assign('/signIn');
      }, 5000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/v1/users/signIn',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signOut = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'api/v1/users/signOut',
    });
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
