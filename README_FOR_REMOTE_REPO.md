# YurService Microfrontend

> **Этот файл предназначен для отдельного репозитория**  
> После миграции скопируйте содержимое этого файла в `README.md` в репозитории `remote-yurservice`

Микрофронтенд для страницы "ЮрСервисы" - независимый модуль, который может быть развернут отдельно или интегрирован в основное приложение через git submodule.

## 🚀 Быстрый старт

### Установка

```bash
git clone https://github.com/global50/remote-yurservice.git
cd remote-yurservice
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Микрофронтенд будет доступен на `http://localhost:3001`

### Сборка

```bash
# Обычная сборка
npm run build

# Сборка как библиотека (для использования в других проектах)
npm run build:library
```

## 📦 Использование

### Как git submodule в основном проекте

```bash
# В основном репозитории
git submodule add https://github.com/global50/remote-yurservice.git microfrontend-yurservice
```

Затем импортируйте компонент:

```typescript
import { YurServicePage } from "../microfrontend-yurservice/src/components/yurservice/YurServicePage";
```

### Как внешняя библиотека

После сборки как библиотеки (`npm run build:library`):

```typescript
import { loadYurServiceMicrofrontend } from './microfrontend-yurservice/src/loader';

await loadYurServiceMicrofrontend({
  supabaseUrl: 'your-supabase-url',
  supabaseAnonKey: 'your-supabase-key',
  url: 'https://your-cdn.com/yurservice'
});
```

## ⚙️ Конфигурация

### Переменные окружения

Создайте файл `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Структура

```
remote-yurservice/
├── src/
│   ├── components/
│   │   └── yurservice/      # Компоненты YurService
│   │       ├── YurServicePage.tsx
│   │       ├── ResourceCard.tsx
│   │       └── RegionSelect.tsx
│   ├── hooks/               # React hooks
│   │   └── use-yurservice-data.ts
│   ├── lib/                 # Утилиты
│   │   └── resource-mapper.ts
│   ├── types/               # TypeScript типы
│   │   ├── database.ts
│   │   └── resource.ts
│   ├── loader.ts           # Loader для внешнего использования
│   └── main.tsx            # Точка входа
├── package.json
├── vite.config.ts
└── README.md
```

## 🔗 Зависимости

Этот микрофронтенд использует **peer dependencies** для избежания дублирования. Основные зависимости должны быть установлены в родительском проекте:

- `react` и `react-dom` (^18.3.1)
- `@radix-ui/*` компоненты
- `@supabase/supabase-js` (^2.57.0)
- `tailwindcss` и связанные утилиты

См. `package.json` для полного списка peer dependencies.

## 🚢 Деплой

### Отдельный деплой

Микрофронтенд может быть развернут отдельно:

```bash
npm run build
# Загрузите содержимое dist/ на ваш CDN или хостинг
```

### CI/CD

Пример GitHub Actions workflow:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: |
          # Ваши команды деплоя
```

## 📝 Разработка

### Локальная разработка

```bash
npm run dev
```

### Линтинг

```bash
npm run lint
```

## 🎯 Особенности

- ✅ **Независимый деплой** - может быть развернут отдельно
- ✅ **Peer dependencies** - избегает дублирования зависимостей
- ✅ **TypeScript** - полная поддержка типов
- ✅ **Vite** - быстрая сборка и HMR
- ✅ **Изолированный код** - чистая архитектура микрофронтенда

## 📚 Дополнительная информация

- [INTEGRATION.md](./INTEGRATION.md) - детали интеграции
- [QUICK_START.md](./QUICK_START.md) - быстрый старт

## 👥 Контакты

[Укажите контакты команды]

