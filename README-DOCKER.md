# Docker Deployment Guide - CBMPE Platform

## 🚀 Quick Start

1. **Clone e configure o ambiente:**

```bash
# Clone o repositório (se ainda não tiver)
git clone <seu-repositorio>
cd pp

# Copie o arquivo de ambiente
cp .env.example .env

# Edite o .env com suas configurações
nano .env
```

2. **Execute o deploy:**

```bash
# Torna o script executável (apenas primeira vez)
chmod +x deploy.sh

# Inicia todos os serviços
./deploy.sh up
```

## 📋 Pré-requisitos

- Docker (versão 20.10+)
- Docker Compose (versão 1.29+)
- 4GB de RAM disponível
- Portas 3000, 3001, 5432, 80 livres

## 🏗️ Arquitetura

A plataforma consiste em:

- **Frontend**: Next.js 15 (porta 3000)
- **Backend**: NestJS (porta 3001)
- **Database**: PostgreSQL 16 (porta 5432)
- **Proxy**: Nginx (porta 80)

## 📁 Estrutura de Arquivos

```
pp/
├── backend/
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── Dockerfile
│   └── ...
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
├── .env.example
├── deploy.sh
└── README-DOCKER.md
```

## 🔧 Comandos Úteis

### Gerenciamento de Serviços

```bash
# Iniciar todos os serviços
./deploy.sh up

# Parar todos os serviços
./deploy.sh down

# Reiniciar serviços
./deploy.sh restart

# Ver status dos serviços
./deploy.sh status

# Ver logs
./deploy.sh logs

# Ver logs de um serviço específico
./deploy.sh logs backend
./deploy.sh logs frontend
./deploy.sh logs postgres
```

### Acesso aos Containers

```bash
# Acessar shell do banco de dados
./deploy.sh db-shell

# Acessar shell do backend
./deploy.sh backend-shell

# Acessar shell do frontend
./deploy.sh frontend-shell
```

### Manutenção

```bash
# Rebuild das imagens
./deploy.sh build

# Limpar tudo (containers, volumes, networks)
./deploy.sh clean
```

## 🔐 Variáveis de Ambiente

Principais variáveis no `.env`:

```env
# Portas
FRONTEND_PORT=3000
BACKEND_PORT=3001
DB_PORT=5432

# Banco de Dados
DB_USERNAME=cbmpe
DB_PASSWORD=cbmpe123
DB_NAME=cbmpe_db

# API
API_KEY=sua-chave-api-segura
SWAGGER_USER=admin
SWAGGER_PASSWORD=admin123

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001

# AWS S3 (opcional)
AWS_ACCESS_KEY_ID=sua-chave
AWS_SECRET_ACCESS_KEY=sua-secret
S3_BUCKET_NAME=seu-bucket
```

## 🌐 URLs de Acesso

Após o deploy, acesse:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api
- **Via Nginx**: http://localhost

## 🚀 Deploy em VM

### 1. Preparar a VM

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo apt install docker-compose -y

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Fazer logout e login novamente
```

### 2. Configurar Firewall

```bash
# Permitir portas necessárias
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw enable
```

### 3. Deploy

```bash
# Clone o projeto na VM
git clone <seu-repositorio>
cd pp

# Configure o ambiente
cp .env.example .env
nano .env  # Ajuste as configurações

# Execute o deploy
chmod +x deploy.sh
./deploy.sh up
```

### 4. Configurar HTTPS (Produção)

1. Edite `nginx/nginx.conf` e descomente a seção HTTPS
2. Adicione seus certificados SSL em `nginx/ssl/`
3. Reinicie o Nginx: `./deploy.sh restart`

## 🔍 Troubleshooting

### Problema: "Cannot connect to database"

```bash
# Verifique se o postgres está rodando
docker-compose ps

# Verifique logs do postgres
./deploy.sh logs postgres

# Teste conexão
docker-compose exec postgres pg_isready
```

### Problema: "Port already in use"

```bash
# Encontre processo usando a porta
sudo lsof -i :3000

# Mate o processo ou mude a porta no .env
```

### Problema: "Permission denied"

```bash
# Certifique-se que o usuário está no grupo docker
groups $USER

# Se não estiver, adicione
sudo usermod -aG docker $USER
# Faça logout e login novamente
```

## 📈 Monitoramento

Para monitorar os recursos:

```bash
# Ver uso de recursos dos containers
docker stats

# Ver espaço em disco
docker system df

# Limpar recursos não utilizados
docker system prune -a
```

## 🔄 Backup e Restore

### Backup do Banco de Dados

```bash
# Criar backup
docker-compose exec postgres pg_dump -U cbmpe cbmpe_db > backup.sql

# Restaurar backup
docker-compose exec -T postgres psql -U cbmpe cbmpe_db < backup.sql
```

## 🛡️ Segurança

1. **Sempre mude as senhas padrão** no arquivo `.env`
2. **Use HTTPS em produção** com certificados válidos
3. **Configure firewall** para permitir apenas portas necessárias
4. **Mantenha Docker atualizado**: `sudo apt update && sudo apt upgrade`
5. **Use secrets** para dados sensíveis em produção

## 📞 Suporte

Em caso de problemas:

1. Verifique os logs: `./deploy.sh logs`
2. Consulte a documentação do Docker
3. Abra uma issue no repositório
