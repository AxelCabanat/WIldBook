import { ISkill, ISkillInput } from "../types/ISkill";
import API from "./APIClient";

export async function getAllSkills(): Promise<ISkill[]> {
  const { data } = await API.get("/skills");
  return data;
}

export async function createSkill(skillProps: ISkillInput) {
  return API.post("/skills", skillProps);
}

export async function deleteSkill(id: number) {
  return API.delete(`/skills/${id}`);
}
