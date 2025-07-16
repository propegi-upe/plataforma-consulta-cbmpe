import { Column, Entity } from 'typeorm';
import { TypeormBaseEntity } from './typeorm-base.entity';

@Entity('users')
export class TypeormUserEntity extends TypeormBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;
}
