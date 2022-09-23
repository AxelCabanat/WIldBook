import styles from './Skill.module.css';


interface SkillProps {
  name: string;
  vote: number;
}

const Skill = ({ name, vote }: SkillProps) => {
  return (
    <li className={styles.skill}>
      {name}
      {<span className={styles.votes}>{vote}</span>}
    </li>
  );
};

export default Skill;
