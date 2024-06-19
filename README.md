<h2 align="center">
  API de Invetario - Node.js | Sequelize
</h2>

<h3> 🛠️ Indicaciones de la Api 🛠️ </h3>

***Requisitos***

- Node version "18.12.1"
- npm version "8.19.2"
- MySQL

***Comandos***
>
- Ejecute `npm i --force` permite crear los archivos necesarios para gestionar la api.
- Ejecute `npm start` para que se inicie la api, si todo salio correcto tendriamos disponible el puerto `localhost:3000` para el cual ya podemos realizarle peticiones.

***request use***

- Registrar Usuario:
>`POST` http://localhost:3000/api/auth/register
Body:
```json
{
  "username": "Ejemplo",
  "password": "Ejemplo1234",
  "role": "client"
}

- Login Usuario:
>`POST` http://localhost:3000/api/auth/login
Body:
```json
{
  "username": "anderson",
  "password": "contrasena123"
}


