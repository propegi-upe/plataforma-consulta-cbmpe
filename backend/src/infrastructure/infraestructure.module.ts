import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USERS_REPOSITORY } from 'src/domain/repositories/tokens';
import { DatabaseModule } from './database/database.module';
//import { TypeormUserEntity } from './database/typeorm/entities/typeorm-user.entity';
//import { TypeormUserRepository } from './database/typeorm/repositories/typeorm-user.repository';
