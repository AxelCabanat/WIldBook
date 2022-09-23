import { MouseEvent, useState,  } from 'react';
import { Link } from 'react-router-dom';

import blank_profile from '../assets/avatar.png';
import { deleteWilder } from '../services/wilders';
import { IWilder } from '../types/IWilder';
import Skill from './Skill';
import styles from './Wilder.module.css';

interface WilderProps {
  wilder: IWilder
  loadWildersIntoState: () => void
}

const Wilder = ({ wilder: { id, name, skills = [] }, loadWildersIntoState} : WilderProps) => {
  const [processing, setProcessing] = useState(false);

  const handleClick = async (e:MouseEvent) => {
    
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
      <Link to={`/wilders/${id}`}><h3>{name[0].toUpperCase() + name.split('').splice(1).join('')}</h3></Link>
      <button onClick={(e) => handleClick(e)} disabled={processing}>SUPPRIMER</button>
      <h4>Wild Skills</h4>
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <Skill key={index} name={skill.name} vote={skill.vote} />
        ))}
      </ul>
    </article>
  );
};

export default Wilder;
