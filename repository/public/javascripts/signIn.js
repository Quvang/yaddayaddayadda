import axios from 'axios';
import { showAlert } from './alerts';

export const signIn = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/alt/signIn',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/alt/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signOut = async () => {
  try {
    const res = await axios({
      methos: 'GET',
      url: '/alt/signOut',
    });
    if ((res.data.status = 'success')) location.assign('/alt/');
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
