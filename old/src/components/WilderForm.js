import { useEffect, useState } from 'react';
import { getAllSkills } from '../services/skills';
import { addSkillToWilder, createWilder } from '../services/wilders';
import SkillButton from './SkillButton';

export default function WilderForm({ loadWildersIntoState, wilders, setWilders }) {
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // const addSkill = async (skillsArray, wilderId) => {
  //   await skillsArray.forEach(skill => await addSkillToWilder(wilderId, {skillId: skill.id}))
  // } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await createWilder({ name });
      console.log('wilder created', res.data);
      console.log(selectedSkills)

      await Promise.all(selectedSkills.map((skill)=>addSkillToWilder(res.data.id, {skillId: skill})))

      // if (selectedSkills.length){
      //     selectedSkills.forEach(skill => {
      //     addSkillToWilder(res.data.id, {skill} )
      //   })
      // }
      await loadWildersIntoState();
      await setSelectedSkills([]);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const loadSkillsIntoState = async () => {

    try {
      setSkills(await getAllSkills());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSkillsIntoState();
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Nom :{' '}
        <input
          type='text'
          id='name'
          disabled={processing}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {skills.map(skill => 
          <SkillButton 
          key={skill.id}
          id={skill.id} 
          name={skill.name} 
          processing={processing} 
          setProcessing={setProcessing}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          />)}
      </label>
      <button type='submit' disabled={processing}>
        Ajouter
      </button>
    </form>
  );
}
