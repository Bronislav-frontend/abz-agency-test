import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/';

export async function fetchUsers(page) {
  try {
    const response = axios.get(`users?page=${page}&count=6`);
    return response;
  } catch (error) {
    toast.warning(`Ooops, something went wrong:${error}`);
  }
}

export async function fetchPositions() {
  try {
    const response = axios.get('positions');
    return response;
  } catch (error) {
    toast.warning(`Ooops, something went wrong:${error}`);
  }
}

export async function postUser(user) {
  try {
    const response = axios.get('token');
    const post = axios.post('users', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Token: (await response).data.token,
      },
    });
    return post;
  } catch (error) {
    toast.warning(`Ooops, something went wrong:${error}`);
  }
}
