const API_SERVER = 'http://localhost:3000/v1/api/';
export const API_EMPLOYER = { 
  register: API_SERVER + 'employer/register',
  authenticate: API_SERVER + 'authentication',
  employer: API_SERVER + 'employer',
  user: API_SERVER + 'user'
};