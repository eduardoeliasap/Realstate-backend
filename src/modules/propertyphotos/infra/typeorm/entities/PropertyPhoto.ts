import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import Property from '../../../../properties/infra/typeorm/entities/Property';

@Entity('propertyphotos')
class PropertyPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  property_id: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  propertytype: Property;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PropertyPhoto;
