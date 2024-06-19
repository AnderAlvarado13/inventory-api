<h2 align="center">
  API de Invetario - Node.js | Sequelize
</h2>

<h3> 🛠️ Indicaciones de la Api 🛠️ </h3>

***Requisitos***

- Node version "18.12.1"
- npm version "8.19.2"
- MySQL
> [!NOTE]
> Puede que sea necesario que cree en su base de datos MySQL cree el esquema `inventory_db` y modificar las credencias en la ruta: src/config/db.config.js

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
```
- Login Usuario:
>`POST` http://localhost:3000/api/auth/login
Body:
```json
{
  "username": "Ejemplo",
  "password": "Ejemplo1234"
}
```
- Crear Productos:
>`POST` http://localhost:3000/api/admin/products
Headers: `Authorization: token`
Body:
```json
{
  "lotNumber": "001",
  "name": "Ejemplo",
  "price": "10000",
  "quantity": "20",
  "entryDate": "2024-06-19 02:04:13"
}
```
- Consultar Productos:
>`GET` http://localhost:3000/api/admin/products
Headers: `Authorization: token`


- Modificar Productos:
>`PUT` http://localhost:3000/api/admin/products/{id}
Headers: `Authorization: token`
Body:
```json
{
  "lotNumber": "001",
  "name": "Ejemplo",
  "price": "10000",
  "quantity": "20",
  "entryDate": "2024-06-19 02:04:13"
}
```

- Eliminar Productos:
>`DELETE` http://localhost:3000/api/admin/products/{id}
Headers: `Authorization: token`

- Consultar Productos por Cliente:
>`GET` http://localhost:3000/api/admin/purchases
Headers: `Authorization: token`

- Crear Compras por el cliente:
>`POST` http://localhost:3000/api/client/purchase
Headers: `Authorization: token`
Body:
```json
{
  "items": [
    { "productId": 1, "quantity": 5 }
    { "productId": 1, "quantity": 5 }
  ]
}
```

- Consultar Compras por cliente:
>`GET` http://localhost:3000/api/client/purchases
Headers: `Authorization: token`

- Consultar Compras por Id:
>`GET` http://localhost:3000/api/client/purchases/{id}
Headers: `Authorization: token`

- Consultar Historico de compras:
>`GET` http://localhost:3000/api/client/purchase-history
Headers: `Authorization: token`