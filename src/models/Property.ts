import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import ContractType from './ContractType';
import PropertType from './PropertyType';
import Realtor from './Realtor';
import Costumer from './Costumer';

@Entity('properties')
class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  costumer_id: string;

  @Column()
  realtor_id: string;

  @Column()
  contracttype_id: number;

  @Column()
  propertytype_id: number;

  @ManyToOne(() => Costumer)
  @JoinColumn({ name: 'costumer_id' })
  costumer: Costumer;

  @ManyToOne(() => Realtor)
  @JoinColumn({ name: 'realtor_id' })
  realtor: Realtor;

  @ManyToOne(() => ContractType)
  @JoinColumn({ name: 'contracttype_id' })
  contracttype: ContractType;

  @ManyToOne(() => PropertType)
  @JoinColumn({ name: 'propertytype_id' })
  propertytype: PropertType;

  @Column()
  desc: string;

  @Column()
  area: string;

  @Column()
  roons: number;

  @Column()
  garage: number;

  @Column()
  suite: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  price: string;

  @Column()
  city_id: number;

  @Column()
  state_id: number;

  @Column()
  situation: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Property;
