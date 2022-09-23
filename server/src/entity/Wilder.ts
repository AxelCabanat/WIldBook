import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Grade from "./Grade";

@Entity()
class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, length: 100, type: "varchar" })
  bio?: string;

  @Column({ nullable: true, length: 500, type: "text" })
  city?: string;

  @OneToMany(() => Grade, (grade) => grade.wilder)
  grades: Grade[];
}

export default Wilder;
