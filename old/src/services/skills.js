import API from './APIClient';

export async function getAllSkills() {
  const { data } = await API.get('/skills');
  return data;
}