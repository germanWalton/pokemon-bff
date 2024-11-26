# Pokemon BFF (Backend for Frontend)

## Descripción del Proyecto

Este proyecto es un Backend for Frontend (BFF) desarrollado con NestJS que consume la PokeAPI y proporciona endpoints optimizados y personalizados para aplicaciones frontend.

## Requisitos Previos

- Node.js (v20)
- PNPM

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/germanWalton/pokemon-bff.git
cd pokemon-bff
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con:
```
PORT:8080
POKEAPI_BASE_URL=https://pokeapi.co/api/v2
```

## Ejecución del Proyecto

### Modo Desarrollo
```bash
pnpm run start:dev
```

### Modo Producción
```bash
pnpm run build
pnpm run start:prod
```

## Documentación de API

La documentación de Swagger está disponible en: `http://localhost:3000/api`

## Endpoints Disponibles

### 1. Detalles de Pokémon por Nombre
- **Endpoint:** `GET /pokemon/:name`
- **Descripción:** Obtiene información detallada de un Pokémon específico
- **Ejemplo:** `/pokemon/pikachu`

### 2. Pokémones por Tipo
- **Endpoint:** `GET /pokemon/type/:type`
- **Descripción:** Lista Pokémones de un tipo específico
- **Ejemplo:** `/pokemon/type/fire`

### 3. Pokémon Aleatorio
- **Endpoint:** `GET /pokemon/random`
- **Descripción:** Devuelve un Pokémon seleccionado aleatoriamente

## Características Principales

- Consumo de PokeAPI
- Transformación de datos
- Documentación con Swagger
- Manejo de errores centralizado
- Caché de respuestas

## Pruebas

### Pruebas Unitarias
```bash
pnpm run test
```

### Pruebas E2E
```bash
pnpm run test:e2e
```

## Tecnologías Utilizadas

- NestJS
- Axios
- Swagger
- Jest
- Cache Manager

## Estrategias Implementadas

### Caché
Implementación de caché para reducir llamadas a la API externa y mejorar rendimiento.

### Manejo de Errores y estandarización de respuestas
La aplicación utiliza un interceptor de errores HTTP (HttpErrorInterceptor) para gestionar de manera centralizada las respuestas de error que se producen durante el manejo de las solicitudes. Este interceptor se encarga de interceptar las respuestas de error y lanzar excepciones específicas basadas en el código de estado HTTP recibido.

### Estandarización de Respuestas
El interceptor de respuesta estándar (StandardResponseInterceptor) se utiliza para estandarizar las respuestas exitosas de la API. Este interceptor transforma las respuestas de manera que todas las respuestas exitosas tengan un formato consistente.

## Contribución

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

[Especificar la licencia, por ejemplo: MIT]
