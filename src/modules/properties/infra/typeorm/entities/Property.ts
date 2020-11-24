import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import ContractType from '@modules/contracties/infra/typeorm/entities/ContractType';
import PropertyType from '@modules/propertytypes/infra/typeorm/entities/PropertyType';
import Realtor from '@modules/realtors/infra/typeorm/entities/Realtor';
import Costumer from '@modules/costumers/infra/typeorm/entities/Costumer';

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

  // @Column()
  // photo_id: string;

  @ManyToOne(() => Costumer)
  @JoinColumn({ name: 'costumer_id' })
  costumer: Costumer;

  @ManyToOne(() => Realtor)
  @JoinColumn({ name: 'realtor_id' })
  realtor: Realtor;

  @ManyToOne(() => ContractType)
  @JoinColumn({ name: 'contracttype_id' })
  contracttype: ContractType;

  @ManyToOne(() => PropertyType)
  @JoinColumn({ name: 'propertytype_id' })
  propertytype: PropertyType;

  /** Importar a Model PropertyPhotos */
  // @OneToOne(() => PropertyPhoto)
  // @JoinColumn({ name: 'photo_id' })
  // photo: PropertyPhoto;

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
