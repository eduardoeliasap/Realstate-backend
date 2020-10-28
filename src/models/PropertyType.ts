import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('propertytypes')
class PropertyType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}

export default PropertyType;
