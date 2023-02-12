<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>


# EJecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar el comando
```
yarn install
```
3. Tener NEST CLI instalado
```
yarn global add @nestjs/cli
```
4. Base de datos
```
docker-compose up -d
```
5. Reconstruir DB seed con
```
localhost:3000/api/v2/seed
```

# Production Build
1. Crear el archivo
```
.env.prod
```
2. LLenar las variables de entorno en prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. Levantar proyecto tipo detach
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```


## Stack
* Nestjs
* MongDB
* Docker