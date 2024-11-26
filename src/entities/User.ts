import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 40,
  })
  firstName: string;
  @Column()
  lastName: string;
  @Column({
    length: 40,
    unique: true,
  })
  email: string;
  @Column({
    length: 40,
    select: false,
  })
  password: string;
}
