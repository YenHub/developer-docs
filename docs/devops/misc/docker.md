# Docker Quick Start & Tips

## List all images

```bash
docker ps -a
```

## Clean system

```bash
echo y | docker system prune --all
```

## Stopping and removing by name
```bash
docker stop $(docker ps -a | grep "zalenium")
docker rm $(docker ps -a | grep "zalenium")
```

## Delete all containers & Prune System Files
```bash
docker rm $(docker ps -a -q -f status=exited)
echo y | docker system prune --all
```

## Docker Build
```bash
# Build it (-t name)
docker build -t my-cool-app

# Run it (host:internal-docker)
docker run -p 3000:3000 --name my-cool-app
```

## Wild Docker Clean Script (Handles VM VHDX too)

Make sure to insert your [USERHERE]

```bash
docker system prune -a -f
net stop com.docker.service
taskkill /F /IM "Docker Desktop.exe"
stop-vm DockerDesktopVM
Optimize-VHD -Path "C:\Users\[USERHERE]\AppData\Local\Docker\wsl\data\ext4.vhdx" -Mode Full
start-vm DockerDesktopVM
start "C:\Program Files\Docker\Docker\Docker Desktop.exe"
net start com.docker.service
echo done :D
```

### Compact VHDX

There is one in AppData (The offender in WSL2) and ProgramData too `C:\ProgramData\DockerDesktop\vm-data`

```powershell
Mount-VHD "C:\Users\gilke\AppData\Local\Docker\wsl\data\ext4.vhdx" -ReadOnly -Passthru | Optimize-VHD -Mode Quick -Passthru | Optimize-VHD -Mode Full -Passthru | Optimize-VHD -Mode Full -Passthru | Dismount-VHD -Passthru | Optimize-VHD -Mode Quick -Passthru | Optimize-VHD -Mode Full
```

## docker-compose

```bash
# Build your images
docker-compose build

# If using only Dockerfile, can run it direct:
docker build

# Run images
docker-compose up -d

# Stop em
docker-compose down

# List Running / Non Running
docker-compose ps -a
docker-compose ls

# tail logs
docker logs [container-name] -f
```

## mySQL

```bash
# Log into instance via cli
docker exec -it my_mysql_instance mysql -uroot -p
```