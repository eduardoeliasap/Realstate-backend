import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('costumers')
class Costumer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default Costumer;
