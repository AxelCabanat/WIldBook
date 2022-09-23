import API from './APIClient';

export async function getAllWilders() {
  const { data } = await API.get('/wilders');
  return data;
}

export async function createWilder(wilderProps) {
  return API.post('/wilders', wilderProps);
}

export async function deleteWilder(id) {
  return API.delete(`/wilders/${id}`);
}

export async function addSkillToWilder(wilderId, skillProps) {
  return API.post(`/wilders/${wilderId}/skills`, skillProps)
}

export async function deleteSkillToWilder(wilderId, skillId) {
  return API.post(`/wilders/${wilderId}/skills/${skillId}`)
}