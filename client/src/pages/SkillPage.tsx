import { ISkill } from "../types/ISkill";
import { useState, useEffect } from "react";
import { getAllSkills } from "../services/skills";
import SkillForm from "../components/SkillForm";
import Skill from "../components/Skill";


const SkillPage = () => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [loadingSkills, setLoadingSkills] = useState<boolean>(false);
  
    const loadSkillsIntoState = async () => {
  
        setLoadingSkills(true);
      try {
        setSkills(await getAllSkills());
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSkills(false);
      }
    };

    useEffect(() => {
        loadSkillsIntoState();
      }, []);

    return (
        <>
            <SkillForm/>
            {skills!==null && skills.map((skill) => {
                <Skill key={skill.id} name={skill.name} vote={1}/>
            })}
        </>
    );
};

export default SkillPage;