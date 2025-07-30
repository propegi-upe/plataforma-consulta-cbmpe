import { Module, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormProjectEntity } from 'src/infrastructure/database/typeorm/entities/typeorm-project.entity';
import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// --- Repositório Simples ---
@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(TypeormProjectEntity)
    private readonly typeOrmRepository: Repository<TypeormProjectEntity>,
  ) {}

  async findAll(): Promise<TypeormProjectEntity[]> {
    return this.typeOrmRepository.find({ take: 10 });
  }
}

// --- Controller de Teste ---
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  @Get()
  async findAll() {
    console.log('Buscando projetos...');
    try {
      const projects = await this.projectsRepository.findAll();
      console.log(`Encontrados ${projects.length} projetos.`);
      return projects;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    }
  }
}

// --- O Módulo que une tudo ---
@Module({
  imports: [TypeOrmModule.forFeature([TypeormProjectEntity])],
  controllers: [ProjectController],
  providers: [ProjectsRepository],
})
export class ProjectModule {}
