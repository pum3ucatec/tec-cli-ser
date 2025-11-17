# Redis + Docker + Ejemplo de Factura

## 1. ¿Qué es Redis?

Redis (Remote Dictionary Server) es una base de datos en memoria, rápida y ligera, utilizada como:

- Base de datos clave-valor
- Sistema de caché
- Cola de mensajes
- Session store
- Motor para contadores, tokens y datos de alta velocidad

### ✔ ¿Cuándo usar Redis?

Redis es ideal cuando necesitas:

- Accesos extremadamente rápidos (operaciones en milisegundos)
- Datos temporales (como tokens, sesiones, caché)
- Contadores, rankings, listas, colas
- Guardar estructura simple (strings, hashes, listas, sets, etc.)
- Reducir carga en una base de datos tradicional

**Redis no es lo ideal para datos relacionales o reportes complejos.**

## 2. Levantar Redis con Docker

### 2.1. Crear el archivo `docker-compose.yml`

```yaml
version: '3.9'
services:
  redis:
    image: redis:latest
    container_name: redis_server
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: ["redis-server", "--appendonly", "yes"]

volumes:
  redis_data:
```

### 2.2. Levantar el contenedor

```bash
docker compose up -d
```

### 2.3. Verificar que Redis está corriendo

```bash
docker ps
```

Debes ver algo como:

```
redis_server  redis:latest  0.0.0.0:6379->6379
```

## 3. Conectarse a Redis y ver datos desde consola

###  Entrar al contenedor

```bash
docker exec -it redis_server redis-cli
```

###  Comandos útiles dentro de Redis CLI

| Acción | Comando |
|-------|---------|
| Ver todas las claves | `keys *` |
| Ver valor de una clave | `get clave` |
| Guardar un string | `set nombre "Kevin"` |
| Borrar una clave | `del clave` |
| Guardar un hash | `hset factura1 cliente "Ana" total "150"` |
| Ver un hash | `hgetall factura1` |

Ejemplo real:

```redis
hset factura:001 id "001"
hset factura:001 cliente "Juan Pérez"
hset factura:001 fecha "2025-11-16"
hset factura:001 total "350.50"
```

Para visualizar:

```redis
hgetall factura:001
```

## 4. Ejemplo básico de almacenamiento de factura en Redis

###  Factura (estructura recomendada)

```
factura:0001 → {
  id: "0001",
  cliente: "Juan Gonzales",
  fecha: "2025-11-16",
  total: "150.90",
  producto1: "Teclado",
  producto2: "Mouse"
}
```

### ✔ Registrar datos desde Redis CLI

```redis
hset factura:0001 id "0001"
hset factura:0001 cliente "Juan Gonzales"
hset factura:0001 fecha "2025-11-16"
hset factura:0001 total "150.90"
hset factura:0001 producto1 "Teclado"
hset factura:0001 producto2 "Mouse"
```

### ✔ Ver la factura

```redis
hgetall factura:0001
```

## 5. Ver Redis desde un IDE / cliente GUI

| Herramienta | Descripción |
|-------------|-------------|
| RedisInsight (oficial) | Cliente gráfico oficial de Redis |
| Medis | Cliente visual para Redis |
| Another Redis Desktop Manager | Liviano y multiplataforma |

### 🔗 Conexión

- Host: 127.0.0.1  
- Puerto: 6379  
- Password: (vacío)

## 6. Detener o eliminar contenedores

### ✔ Solo detener

```bash
docker compose stop
```

### ✔ Detener y eliminar contenedores

```bash
docker compose down
```

### ✔ Eliminar datos persistentes

```bash
docker volume rm nombre_del_volumen
```

#  Uso Rápido

1. Crear `docker-compose.yml`
2. Ejecutar `docker compose up -d`
3. Conectarse con `docker exec -it redis_server redis-cli`
4. ¡Usar Redis!
