# Инструкция по изменению и деплою микрофронтенда на CDN

## Обзор

Этот микрофронтенд собирается в UMD формат и деплоится на CDN через GitHub репозиторий `global50/remote-yurservice-cdn`. CDN использует jsDelivr для раздачи файлов.

## Структура проекта

```
microfrontend-yurservice/
├── src/                    # Исходный код
│   ├── components/         # React компоненты
│   ├── hooks/             # React хуки
│   ├── lib/               # Утилиты и библиотеки
│   └── types/             # TypeScript типы
├── dist/                   # Собранные файлы (генерируется)
├── scripts/
│   └── deploy-to-cdn.sh   # Скрипт деплоя
└── vite.config.ts         # Конфигурация сборки
```

## Процесс внесения изменений и деплоя

### Шаг 1: Внесите изменения в исходный код

Отредактируйте файлы в папке `src/`:
- Компоненты: `src/components/yurservice/`
- Хуки: `src/hooks/`
- Утилиты: `src/lib/`
- Типы: `src/types/`

### Шаг 2: Соберите проект

```bash
cd microfrontend-yurservice
npm run build:library
```

Это создаст файлы в папке `dist/`:
- `yurservice-microfrontend.umd.js` - JavaScript бандл
- `yurservice-microfrontend.umd.css` - CSS стили

### Шаг 3: Проверьте локально (опционально)

Запустите dev сервер для проверки:

```bash
npm run dev
```

Микрофронтенд будет доступен на `http://localhost:3001`

### Шаг 4: Деплой на CDN

Используйте скрипт деплоя:

```bash
cd microfrontend-yurservice
./scripts/deploy-to-cdn.sh
```

Скрипт:
1. Проверит наличие собранных файлов
2. Создаст временный git репозиторий
3. Скопирует файлы в структуру `dist/`
4. Закоммитит и отправит в `global50/remote-yurservice-cdn`
5. Выведет URL с хэшем коммита для использования

**Важно:** Скрипт использует `git push -f` для перезаписи истории в CDN репозитории.

### Шаг 5: Обновите URL в хост-приложении

После деплоя скрипт выведет URL вида:
```
https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@<commit-hash>/dist
```

Обновите переменную окружения в хост-приложении (например, в StackBlitz):

```env
VITE_YURSERVICE_CDN_URL=https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@<commit-hash>/dist
```

**Важно:** Используйте хэш коммита вместо `@main` для обхода кэша jsDelivr.

## Требования

- Node.js и npm установлены
- Git настроен
- Доступ на запись в репозиторий `global50/remote-yurservice-cdn`

## Режимы сборки

### Library режим (для CDN)

```bash
BUILD_MODE=library npm run build
```

или

```bash
npm run build:library
```

Создает UMD бандл с внешними зависимостями React и ReactDOM.

### Dev режим

```bash
npm run dev
```

Запускает dev сервер на `http://localhost:3001`

## Структура UMD бандла

Микрофронтенд экспортируется как `window.YurServiceMicrofrontend` и содержит:
- `YurServicePage` - главный компонент
- `ResourceCard` - компонент карточки ресурса
- `RegionSelect` - компонент выбора региона
- `useYurServiceData` - хук для данных
- `mapDatabaseResourceToUI` - функция маппинга

## Зависимости

Микрофронтенд использует React и ReactDOM из хост-приложения через `window.React` и `window.ReactDOM`.

Supabase клиент берется из `window.__SUPABASE_CLIENT__`, который должен быть предоставлен хост-приложением.

## Устранение проблем

### Файлы не загружаются с CDN

1. Проверьте, что файлы действительно задеплоены:
   ```bash
   curl -I https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@<commit-hash>/dist/yurservice-microfrontend.umd.js
   ```

2. Используйте хэш коммита вместо `@main` для обхода кэша

3. Подождите несколько минут - jsDelivr может кэшировать файлы

### Ошибка "React is not defined"

Убедитесь, что хост-приложение экспортирует React в `window.React` перед загрузкой микрофронтенда.

### Стили не применяются

Проверьте, что CSS файл загружается. Хост-приложение должно загружать `yurservice-microfrontend.umd.css` автоматически через скрипт загрузчика.

## Дополнительная информация

- jsDelivr CDN: https://www.jsdelivr.com/
- GitHub репозиторий CDN: https://github.com/global50/remote-yurservice-cdn

