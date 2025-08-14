#!/bin/bash

# Deploy script for Perpart Platform
set -e

echo "🚀 Starting Perpart Platform deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configurations."
    echo "❗ Edit the .env file and run this script again."
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Docker installation
if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check Docker Compose installation
if ! command_exists docker-compose; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Parse command line arguments
ACTION=${1:-up}

case $ACTION in
    up|start)
        echo "📦 Building and starting all services..."
        docker-compose up -d --build
        echo "✅ All services are running!"
        echo ""
        echo "🌐 Access points:"
        echo "   - Frontend: http://localhost:3000"
        echo "   - Backend API: http://localhost:3001"
        echo "   - Swagger Docs: http://localhost:3001/api"
        echo "   - PostgreSQL: localhost:5432"
        ;;
    
    down|stop)
        echo "🛑 Stopping all services..."
        docker-compose down
        echo "✅ All services stopped."
        ;;
    
    restart)
        echo "🔄 Restarting all services..."
        docker-compose restart
        echo "✅ All services restarted."
        ;;
    
    logs)
        SERVICE=${2:-}
        if [ -z "$SERVICE" ]; then
            docker-compose logs -f
        else
            docker-compose logs -f $SERVICE
        fi
        ;;
    
    build)
        echo "🏗️  Building all services..."
        docker-compose build
        echo "✅ Build completed."
        ;;
    
    clean)
        echo "🧹 Cleaning up everything (including volumes)..."
        docker-compose down -v
        echo "✅ Cleanup completed."
        ;;
    
    status)
        echo "📊 Service status:"
        docker-compose ps
        ;;
    
    db-shell)
        echo "🔗 Connecting to PostgreSQL..."
        docker-compose exec postgres psql -U ${DB_USERNAME:-cbmpe} -d ${DB_NAME:-cbmpe_db}
        ;;
    
    backend-shell)
        echo "🔗 Connecting to backend container..."
        docker-compose exec backend sh
        ;;
    
    frontend-shell)
        echo "🔗 Connecting to frontend container..."
        docker-compose exec frontend sh
        ;;
    
    *)
        echo "Usage: $0 {up|down|restart|logs|build|clean|status|db-shell|backend-shell|frontend-shell}"
        echo ""
        echo "Commands:"
        echo "  up/start       - Build and start all services"
        echo "  down/stop      - Stop all services"
        echo "  restart        - Restart all services"
        echo "  logs [service] - Show logs (optionally for specific service)"
        echo "  build          - Build all Docker images"
        echo "  clean          - Stop and remove all containers and volumes"
        echo "  status         - Show service status"
        echo "  db-shell       - Connect to PostgreSQL shell"
        echo "  backend-shell  - Connect to backend container shell"
        echo "  frontend-shell - Connect to frontend container shell"
        exit 1
        ;;
esac
