import { IWilder, IWilderInput } from "../types/IWilder";
import API from "./APIClient";

export interface SkillToAdd {
  skillId: number;
}

export async function getAllWilders(): Promise<IWilder[]> {
  const { data } = await API.get("/wilders");
  return data;
}

export async function getOneWilder(id: number): Promise<IWilder> {
  const { data } = await API.get(`/wilders/${id}`);
  return data;
}

export async function createWilder(wilderProps: IWilderInput) {
  return API.post("/wilders", wilderProps);
}

export async function deleteWilder(id: number) {
  return API.delete(`/wilders/${id}`);
}

export async function addSkillToWilder(
  wilderId: number,
  skillProps: SkillToAdd
) {
  return API.post(`/wilders/${wilderId}/skills`, skillProps);
}

export async function deleteSkillToWilder(wilderId: number, skillId: number) {
  return API.post(`/wilders/${wilderId}/skills/${skillId}`);
}
