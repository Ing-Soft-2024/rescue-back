## Plantilla de Express.js para Estructura de Directorios

### Requisitos
- nodemon
- babel-node

### Cómo iniciar

1. Instalar dependencias:
    ```bash
    npm i
    ```

2. Configurar el archivo `.env` con los siguientes datos:
    ```py
    # Puerto donde se inicializará el servidor
    PORT=

    # (Opcional) URL de la API
    API_URL=
    ```

3. Iniciar el servidor utilizando uno de los siguientes comandos:
    ```bash
    npm run dev
    ```

    ```bash
    node --run dev
    ```

4. Para hacer un build, utiliza los siguientes comandos:
    ```bash
    npm run build
    ```

    ```bash
    node --run build
    ```

### Agregar Endpoints

Para agregar nuevos endpoints, crea una carpeta con el nombre del endpoint dentro del directorio `/src/app`.

Para crear endpoints con parámetros, utiliza dos puntos en el nombre de la carpeta, por ejemplo: `/src/app/example/:id`. También puedes anidar directorios según sea necesario.

### Cómo hacer un GET

1. Crea el directorio, por ejemplo: `/src/app/example` y crea el archivo `router.js` para iniciar un nuevo endpoint.
2. En `router.js` copia el siguiente código:
    ```js
    export default class Route {
        static GET = (req, res) => {
            return res.json({
                status: 'success',
                data: {
                    message: req.params.id
                }
            });
        }
    }
    ```

Recuerda que los parámetros de `GET` son los mismos que para una función `get` de express.js. De la misma manera podrás crear `POST`, `DELETE` y `PUT`, cambiando el nombre de la función por la correspondiente.

Otra forma de realizar un GET es utilizando el mismo archivo pero haciendo lo siguiente, y que pudiera resultar más práctico:
```js
export const GET = (req, res) => {
    return res.json({
        status: 'success',
        data: {
            message: req.params.id
        }
    });
}
```