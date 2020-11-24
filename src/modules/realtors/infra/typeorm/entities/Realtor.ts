import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

import AvatarRealtor from '@modules/avatars/infra/typeorm/entities/AvatarRealtor';

@Entity('realtors')
class Costumer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar_id: number;

  @OneToOne(() => AvatarRealtor)
  @JoinColumn({ name: 'avatar_id' })
  avatarName: AvatarRealtor;

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
  creci: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Costumer
