# YurService Microfrontend - Standalone Repository

Этот репозиторий содержит микрофронтенд для страницы "ЮрСервисы", который может быть использован как отдельный модуль или интегрирован в основное приложение через git submodule.

## 📦 Установка

### Как отдельный проект

```bash
git clone https://github.com/global50/remote-yurservice.git
cd remote-yurservice
npm install
npm run dev
```

### Как git submodule в основном проекте

```bash
# В основном репозитории
git submodule add https://github.com/global50/remote-yurservice.git microfrontend-yurservice
cd microfrontend-yurservice
npm install
```

## 🚀 Разработка

### Локальная разработка

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

## 📚 Использование

### В основном проекте (через submodule)

Микрофронтенд автоматически интегрирован в основное приложение:

```typescript
import { YurServicePage } from "../microfrontend-yurservice/src/components/yurservice/YurServicePage";
```

### Как внешняя библиотека

После сборки как библиотеки (`npm run build:library`), можно использовать через loader:

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

## 🔗 Зависимости

Этот микрофронтенд использует peer dependencies для избежания дублирования зависимостей. Основные зависимости должны быть установлены в родительском проекте:

- `react` и `react-dom`
- `@radix-ui/*` компоненты
- `@supabase/supabase-js`
- `tailwindcss` и связанные утилиты

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

## 📝 Лицензия

[Укажите лицензию]

## 👥 Контакты

[Укажите контакты команды]

