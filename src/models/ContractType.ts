import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracttypes')
class ContractType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}

export default ContractType;
