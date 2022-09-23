import { useEffect, useState,  FormEvent } from 'react';
import { getAllSkills } from '../services/skills';
import { addSkillToWilder, createWilder } from '../services/wilders';
import { ISkill } from '../types/ISkill';
import { IWilderInput } from '../types/IWilder';
import SkillButton from './SkillButton';

interface WilderFormProps {
  loadWildersIntoState: () => void
}

export default function WilderForm({ loadWildersIntoState }: WilderFormProps ) {
  const [name, setName] = useState<IWilderInput["name"]>('');
  const [city, setCity] = useState<IWilderInput["city"]>('');
  const [bio, setBio] = useState<IWilderInput["bio"]>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await createWilder({ name, city, bio});
      console.log('wilder created', res.data);
      console.log(selectedSkills)

      await Promise.all(selectedSkills.map((skill)=>addSkillToWilder(res.data.id, {skillId: skill})))

      loadWildersIntoState();
      setSelectedSkills([]);
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
        </label>
        <label htmlFor='city'>
        City :{' '}
        <input
          type='text'
          id='city'
          disabled={processing}
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        </label>
              <label htmlFor='bio'>
        Bio :{' '}
        <input
          type='textarea'
          id='bio'
          disabled={processing}
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
        </label>
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
      
      <button type='submit' disabled={processing}>
        Ajouter
      </button>
    </form>
  );
}
