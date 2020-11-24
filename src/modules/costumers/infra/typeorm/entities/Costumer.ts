import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column()
  cpfcnpj: string;

  @Column()
  address: string;

  @Column()
  neighborhood: string;

  @Column()
  num: string;

  @Column()
  city_id: number;

  @Column()
  cep: string;

  @Column()
  state_id: number;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Costumer;
