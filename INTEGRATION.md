# Интеграция YurService Microfrontend

## Текущее состояние

Микросервис уже интегрирован в основное приложение и работает автоматически.

## Что уже настроено

✅ Микросервис подключен в `src/App.tsx`  
✅ npm workspaces настроены для автоматической установки зависимостей  
✅ Vite конфигурация настроена для разрешения алиасов микросервиса  
✅ TypeScript конфигурация обновлена  
✅ Переменные окружения используются из основного проекта  
✅ Shared код вынесен в `shared-src/` с алиасом `@shared`

## Установка

```bash
npm install
```

Зависимости устанавливаются автоматически для основного проекта и микросервиса.

## Запуск

```bash
npm run dev
```

Откройте `http://localhost:5173/yurservice` - страница работает автоматически.

## Конфигурация

### Переменные окружения

Создайте `.env` файл в корне проекта:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Микросервис автоматически использует эти переменные.

## Как это работает

### npm workspaces

Проект использует npm workspaces:
- Зависимости устанавливаются в корневой `node_modules`
- Дублирование предотвращается автоматически
- Установка быстрее благодаря общей структуре

### Shared код (shared-src/)

Все общие компоненты, хуки и утилиты находятся в `shared-src/` и используются через алиас `@shared`:

```typescript
// UI компоненты
import { Button } from '@shared/components/ui/button'
import { Card } from '@shared/components/ui/card'

// Хуки
import { useToast } from '@shared/hooks/use-toast'

// Утилиты
import { cn } from '@shared/lib/utils'
import { supabase } from '@shared/lib/supabase'
```

Это исключает дублирование кода между основным приложением и микросервисом.

### Интеграция в код

Микросервис импортируется в `src/App.tsx`:

```typescript
import { YurServicePage } from "../microfrontend-yurservice/src/components/yurservice/YurServicePage";
```

Vite автоматически обрабатывает импорты через настроенный плагин для разрешения алиасов `@shared` и `@/`.

## Оптимизация зависимостей

- React и ReactDOM используются из корневого проекта (peerDependencies)
- npm workspaces автоматически поднимает одинаковые версии наверх
- Дублирование предотвращается автоматически
- Установка быстрее благодаря общей структуре node_modules
- Общие компоненты в `shared-src/` используются без дублирования

## Сборка

```bash
npm run build
```

Микросервис автоматически включается в сборку основного приложения.

## Отдельный деплой микросервиса

Если нужно задеплоить микросервис отдельно:

```bash
cd microfrontend-yurservice
npm run build
```

Загрузите содержимое `dist/` на CDN или хостинг.

## Структура

```
ms-yurservice/
├── src/                          # Основное приложение
│   └── App.tsx                   # Импорт микросервиса
├── microfrontend-yurservice/     # Микросервис
│   ├── src/
│   │   └── components/
│   │       └── yurservice/
│   └── package.json
├── shared-src/                   # Общие компоненты, хуки и утилиты
│   ├── components/ui/           # UI компоненты
│   ├── hooks/                   # Общие хуки
│   └── lib/                     # Общие утилиты и Supabase
├── package.json                  # Workspaces конфигурация
├── .npmrc                        # Настройки npm
└── vite.config.ts                # Плагин для алиасов
```

## Поддержка

При проблемах:
1. Проверьте установку: `npm install`
2. Проверьте переменные окружения в `.env`
3. Проверьте консоль браузера на ошибки
4. Убедитесь что основной проект запускается: `npm run dev`
5. Проверьте что алиас `@shared` настроен в `vite.config.ts` и `tsconfig.json`

## Дополнительная информация

- Быстрый старт: `QUICK_START.md`
- Общее руководство: `README.md`
- Интеграция в основном проекте: `../INTEGRATION_GUIDE.md`
