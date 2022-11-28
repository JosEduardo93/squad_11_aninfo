# Squad 11 aninfo

## Modelo de Proyectos

| Padrón | Alumnos                 |
|--------|-------------------------|
| 104928 | Hosain, Kamal           |
|  96467 | Chávez Cabanillas, José |
| 101589 | Álvarez, Juan Manuel    |
| 106022 | Pereyra, Ignacio        |
| 102988 | Goyzueta, Alan          |

## Build & Compile

``` 
    npm install
    npm run start
    npm run cucumber
    npm run cucumber-linux
```

## Base de datos

La base de datos que usa este proyecto es MongoDB, para asociar tu base de datos al proyecto se debe crear un archivo `.env` dentro debe contener la variable URL de la siguiente manera 

```
    URL=<clave de acceso a mongoDB>
```

## API
Para la ejecucion de la `API`, se debe ejecutar el comando `npm run start`. Para la visualizacion de las API's se usa `Swagger`, el cual se encuentra documentando en la dirección `/api-doc`, debe dirigirse a la direccion de su localhost en el puerto 8080.
Actualmente se encuentra desplegada en el [Siguiente Enlace](https://project-api-kurk.onrender.com/)

## Cucumber
Para la ejecucion de los test, se debe ejecutar el comando `npm run cucumber`, es necesario tener la `API` activa al momento de realizarse. Revisa el comando en caso de usar un SO Linux

Para la visualizacion del reporte de los Tests se usa `Cucumber`, el cual se encuentra documentando en un archivo html con nombre `cucumber-report`, asegurese de haber realizado antes los test.
