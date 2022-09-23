import { useState } from 'react';

import blank_profile from '../assets/avatar.png';
import { deleteWilder } from '../services/wilders';
import Skill from './Skill';
import styles from './Wilder.module.css';

const Wilder = ({ id, name, skills = [], loadWildersIntoState, setWilders}) => {
  const [processing, setProcessing] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setProcessing(true)
    try {
      await deleteWilder(id);
      loadWildersIntoState();
    } catch (err) {
      console.log(err)
    } finally {
      setProcessing(false)
    }
    
  }
  return (
    <article className={styles.card}>
      <img src={blank_profile} alt='Jane Doe Profile' />
      <h3>{name[0].toUpperCase() + name.split('').splice(1).join('')}</h3>
      <button onClick={(e) => handleClick(e)} disabled={processing}>SUPPRIMER</button>
      <h4>Wild Skills</h4>
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <Skill key={index} title={skill.name} votes={skill.votes} />
        ))}
      </ul>
    </article>
  );
};

export default Wilder;
