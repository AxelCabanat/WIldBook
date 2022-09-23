import { useEffect, useState, Dispatch, SetStateAction, MouseEvent } from 'react';
import styles from "./SkillButton.module.css"

interface SkillButtonProps {
    id: number
    name: string
    processing:boolean
    setProcessing: Dispatch<SetStateAction<boolean>>
    selectedSkills:number[]
    setSelectedSkills:Dispatch<SetStateAction<number[]>>
}
const SkillButton = ({id, name, processing, setProcessing, selectedSkills, setSelectedSkills}:SkillButtonProps) => {
    const [selected, setSelected] = useState<boolean>(selectedSkills.includes(id));

    const handleSkillClic = async (e:MouseEvent) => {
        e.preventDefault();
        await setProcessing(true);
            
        try {
            if (selectedSkills.includes(id)){
                await setSelectedSkills(selectedSkills.filter((skillId) => skillId!==id))
            } else {
                await setSelectedSkills(current => [...current, id])
            }
        } catch (err) {
            console.log(err)
        } finally {
            setProcessing(false)
        }  
    }

        useEffect(()=>{
            setSelected(selectedSkills.includes(id))
        },[selectedSkills, id])

    return (
        <button className={selected ? styles.selected:styles.unselected} disabled={processing} onClick={(e) => handleSkillClic(e)}>
            {name}
        </button>
    );
};

export default SkillButton;