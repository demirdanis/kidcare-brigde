# KidCare Bridge - Hasura GraphQL Setup Guide

Bu proje, PostgreSQL veritabanları ve Hasura GraphQL Engine kullanarak kidcare-bridge uygulamasını çalıştırmak için gerekli Docker Compose konfigürasyonunu içerir.

## 📋 Gereksinimler

- Docker ve Docker Compose
- curl (Hasura CLI kurulumu için)

## 🚀 Kurulum Adımları

### 1. Environment Dosyasını Oluşturun

Proje ana dizininde `.env` dosyası oluşturun:

```bash
# .env dosyasını oluşturun
touch .env

# Dosya izinlerini ayarlayın
chmod 644 .env
```

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_METADATA_DB=kidcare_bridge_metadata_db
POSTGRES_CORE_DB=kidcare_bridge_core_db

PGADMIN_PORT=35111
POSTGRES_CORE_PORT=5001
HASURA_PORT_1=23564
HASURA_PORT_2=43172

PGADMIN_DEFAULT_EMAIL=demirdanis@gmail.com
PGADMIN_DEFAULT_PASSWORD=pass

HASURA_GRAPHQL_ENABLE_CONSOLE=true
HASURA_GRAPHQL_SERVER_PORT=43172
HASURA_GRAPHQL_ADMIN_SECRET=secret
HASURA_GRAPHQL_DEV_MODE=true
HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256","key":"secret2"}'
HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous
HASURA_GRAPHQL_EXPERIMENTAL_FEATURES=naming_convention
HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION=graphql-default
HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS=false
```

> ⚠️ **Güvenlik Uyarısı**: Production ortamında `HASURA_GRAPHQL_ADMIN_SECRET` ve `POSTGRES_PASSWORD` değerlerini güçlü parolalarla değiştirin.

### 2. Docker Compose Konfigürasyonu

`docker-compose.yml` dosyanız şu şekilde olmalı:

```yaml
version: "3.8"

services:
  pgadmin:
    image: dpage/pgadmin4:8.5
    depends_on:
      - "kidcare-bridge-metadata"
      - "kidcare-bridge-core"
    ports:
      - "${PGADMIN_PORT}:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
    env_file:
      - .env

  kidcare-bridge-metadata:
    image: postgis/postgis:16-3.4
    restart: always
    volumes:
      - ./data/kidcare_bridge_metadata_db:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_METADATA_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    env_file:
      - .env

  kidcare-bridge-core:
    image: postgis/postgis:16-3.4
    restart: always
    volumes:
      - ./data/kidcare_bridge_core_db:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_CORE_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "${POSTGRES_CORE_PORT}:5432"
    env_file:
      - .env

  hasura:
    image: hasura/graphql-engine:v2.41.0.cli-migrations-v3
    ports:
      - "${HASURA_PORT_1}:${HASURA_PORT_1}"
      - "${HASURA_PORT_2}:${HASURA_PORT_2}"
    depends_on:
      - "kidcare-bridge-metadata"
      - "kidcare-bridge-core"
    restart: always
    working_dir: /app
    volumes:
      - ./kidcare-bridge:/app
      - ./kidcare-bridge/migrations:/hasura-migrations
      - ./kidcare-bridge/metadata:/hasura-metadata
    environment:
      HASURA_GRAPHQL_METADATA_DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@kidcare-bridge-metadata:5432/${POSTGRES_METADATA_DB}
      HASURA_GRAPHQL_KIDCARE_BRIDGE_CORE_DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@kidcare-bridge-core:5432/${POSTGRES_CORE_DB}
      HASURA_GRAPHQL_CONSOLE_ASSETS_DIR: /srv/console-assets
      HASURA_GRAPHQL_ENABLE_CONSOLE: ${HASURA_GRAPHQL_ENABLE_CONSOLE}
      HASURA_GRAPHQL_ENABLED_APIS: "graphql,metadata,pgdump"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      HASURA_GRAPHQL_SERVER_PORT: ${HASURA_GRAPHQL_SERVER_PORT}
      HASURA_GRAPHQL_ADMIN_SECRET: ${HASURA_GRAPHQL_ADMIN_SECRET}
      HASURA_GRAPHQL_DEV_MODE: ${HASURA_GRAPHQL_DEV_MODE}
      HASURA_GRAPHQL_JWT_SECRET: ${HASURA_GRAPHQL_JWT_SECRET}
      HASURA_GRAPHQL_UNAUTHORIZED_ROLE: ${HASURA_GRAPHQL_UNAUTHORIZED_ROLE}
      HASURA_GRAPHQL_EXPERIMENTAL_FEATURES: ${HASURA_GRAPHQL_EXPERIMENTAL_FEATURES}
      HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION: ${HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION}
      HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS: ${HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS}
    env_file:
      - .env

volumes:
  pgadmin_data:
```

### 3. İlk Başlatma

```bash
# Container'ları başlatın
docker-compose up -d

# Logları kontrol edin
docker-compose logs -f hasura
```

### 4. Hasura CLI Kurulumu

```bash
# Hasura CLI'yi kurun
curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

# CLI'nin doğru kurulduğunu kontrol edin
hasura version
```

### 5. Hasura Projesini Initialize Edin

```bash
# kidcare-bridge dizinini oluşturun (eğer yoksa)
mkdir -p kidcare-bridge
cd kidcare-bridge

# Hasura projesini initialize edin
hasura init . --endpoint http://localhost:43172 --admin-secret secret

# Ana dizine geri dönün
cd ..
```

### 6. Container'ları Yeniden Başlatın

```bash
# Container'ları durdurun
docker-compose down

# Yeniden başlatın
docker-compose up -d

# Logları kontrol edin
docker-compose logs -f hasura
```

## 🔗 Erişim URL'leri

- **Hasura Console**: http://localhost:43172/console
- **PgAdmin**: http://localhost:35111
- **PostgreSQL Core DB**: localhost:5001
- **GraphQL API**: http://localhost:43172/v1/graphql

## 📝 Login Bilgileri

### PgAdmin

- **Email**: demirdanis@gmail.com
- **Password**: pass

### Hasura Console

- **Admin Secret**: secret

## 🔧 Yararlı Komutlar

```bash
# Container durumunu kontrol et
docker-compose ps

# Logları görüntüle
docker-compose logs -f [service_name]

# Container'ları yeniden başlat
docker-compose restart [service_name]

# Container'ları tamamen temizle
docker-compose down --volumes --remove-orphans

# Hasura metadata export et
cd kidcare-bridge
hasura metadata export

# Hasura migrations uygula
hasura migrate apply

# Hasura console başlat (CLI ile)
hasura console
```

## 🐛 Sorun Giderme

### Hasura Console Açılmıyor

- `.env` dosyasında `HASURA_GRAPHQL_ENABLE_CONSOLE=true` olduğundan emin olun
- Container'ları yeniden başlatın: `docker-compose restart hasura`

### Environment Değişkenleri Yüklenmiyor

- `.env` dosyasının `docker-compose.yml` ile aynı dizinde olduğundan emin olun
- Dosya izinlerini kontrol edin: `chmod 644 .env`

### Database Bağlantı Sorunları

- PostgreSQL container'larının çalıştığını kontrol edin: `docker-compose ps`
- Database credential'larını `.env` dosyasında kontrol edin

### Metadata Hatası

- `kidcare-bridge/metadata/` dizininin var olduğundan emin olun
- Hasura'yı tekrar initialize edin

## 📁 Proje Yapısı

```
project-root/
├── .env                          # Environment değişkenleri
├── docker-compose.yml           # Docker Compose konfigürasyonu
├── kidcare-bridge/              # Hasura proje dizini
│   ├── config.yaml              # Hasura konfigürasyonu
│   ├── metadata/                # Hasura metadata dosyaları
│   ├── migrations/              # Database migration dosyaları
│   └── seeds/                   # Database seed dosyaları
└── data/                        # PostgreSQL data volumes
    ├── kidcare_bridge_metadata_db/
    └── kidcare_bridge_core_db/
```

## 🎯 Sonraki Adımlar

### 1. Hasura Console'a Giriş

Tarayıcınızda http://localhost:43172/console adresine gidin.

### 2. Database Bağlantısını Kurun

Hasura Console'da:

1. **Data** sekmesine tıklayın
2. **Manage** butonuna tıklayın
3. **Connect Database** seçeneğini seçin
4. **PostgreSQL** seçin
5. **Connect Existing Database** seçin
6. Aşağıdaki bilgileri girin:
   - **Database Name**: `kidcare-bridge-core`
   - **Environment Variable**: `HASURA_GRAPHQL_KIDCARE_BRIDGE_CORE_DATABASE_URL`
7. **Connect Database** butonuna tıklayın

> 📝 **Not**: Database bağlantısı environment variable üzerinden yapılacağı için manuel connection string girmenize gerek yok.

### 3. Tabloları Oluşturun ve Track Edin

Database bağlandıktan sonra:

1. **Create Table** ile yeni tablolar oluşturun
2. **Track** butonuna basarak tabloları GraphQL API'ye ekleyin

### 4. GraphQL API'nizi Test Edin

**GraphiQL** sekmesinden API'nizi test edebilirsiniz.

### 5. İleri Seviye Konfigürasyon

- Permissions tanımlayın
- Relationships oluşturun
- Custom functions ekleyin

---

**Not**: Bu kurulum development ortamı için optimize edilmiştir. Production deployment için ek güvenlik önlemleri alınmalıdır.
