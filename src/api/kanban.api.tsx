import axios from 'axios';

export interface ErrorResponse {
  message:    string[] | string;
  error:      string;
  statusCode: number;
}

const kanbanApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default kanbanApi;
