# LocalStack S3 Setup

## Configuração do LocalStack com S3

### 1. Iniciar o LocalStack

```bash
docker-compose -f docker-compose.localstack.yml up -d
```

### 2. Verificar se está rodando

```bash
docker ps
# Ou
curl http://localhost:4566/_localstack/health
```

### 3. Configurar o Frontend

Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cd frontend
cp .env.local.example .env.local
```

### 4. Usar o componente de upload

Importe o componente S3UploadExample em qualquer página:

```tsx
import S3UploadExample from '@/components/s3-upload-example';

export default function Page() {
  return (
    <div>
      <S3UploadExample />
    </div>
  );
}
```

### 5. Comandos úteis do AWS CLI com LocalStack

```bash
# Listar buckets
aws --endpoint-url=http://localhost:4566 s3 ls

# Listar arquivos no bucket
aws --endpoint-url=http://localhost:4566 s3 ls s3://perpart-uploads

# Baixar arquivo
aws --endpoint-url=http://localhost:4566 s3 cp s3://perpart-uploads/arquivo.jpg .
```

### Parar o LocalStack

```bash
docker-compose -f docker-compose.localstack.yml down
```
