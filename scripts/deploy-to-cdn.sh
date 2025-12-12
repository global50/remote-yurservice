#!/bin/bash

set -e

REPO_URL="${1:-https://github.com/global50/remote-yurservice-cdn.git}"
BRANCH="${2:-main}"

echo "🚀 Публикация микрофронтенда на CDN..."
echo "📦 Репозиторий: $REPO_URL"
echo "🌿 Ветка: $BRANCH"
echo ""

if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: Запустите скрипт из директории microfrontend-yurservice"
    exit 1
fi

if [ ! -d "dist" ]; then
    echo "🔨 Сборка проекта..."
    npm run build:library
fi

if [ ! -d "dist" ]; then
    echo "❌ Ошибка: Папка dist не найдена после сборки"
    exit 1
fi

# Проверяем наличие необходимых файлов
if [ ! -f "dist/yurservice-microfrontend.umd.js" ]; then
    echo "❌ Ошибка: Файл dist/yurservice-microfrontend.umd.js не найден"
    exit 1
fi

if [ ! -f "dist/yurservice-microfrontend.umd.css" ]; then
    echo "⚠️  Предупреждение: Файл dist/yurservice-microfrontend.umd.css не найден"
fi

echo "📝 Подготавливаем файлы для деплоя..."
# Создаем временную директорию для деплоя
TEMP_DIR=$(mktemp -d)
mkdir -p "$TEMP_DIR/dist"

# Копируем файлы в правильную структуру
cp dist/yurservice-microfrontend.umd.js "$TEMP_DIR/dist/"
[ -f "dist/yurservice-microfrontend.umd.css" ] && cp dist/yurservice-microfrontend.umd.css "$TEMP_DIR/dist/"

cd "$TEMP_DIR"

if [ ! -d ".git" ]; then
    echo "📁 Инициализируем git репозиторий..."
    git init
    git branch -M main
fi

if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Добавляем remote..."
    git remote add origin "$REPO_URL"
else
    git remote set-url origin "$REPO_URL"
fi

echo "📝 Добавляем файлы..."
git add -f dist/

if [ -n "$(git status --porcelain)" ]; then
    echo "💾 Создаем коммит..."
    git commit -m "Deploy microfrontend UMD bundle with CSS - $(date +%Y-%m-%d-%H%M)" || echo "Нет изменений для коммита"
else
    echo "ℹ️  Нет изменений для коммита"
fi

echo "📤 Отправляем в репозиторий..."
git push -f origin "$BRANCH" || {
    echo "⚠️  Не удалось отправить. Возможно, нужно настроить доступ."
    echo "Выполните вручную:"
    echo "  cd $TEMP_DIR"
    echo "  git push -f origin $BRANCH"
    exit 1
}

# Получаем финальный хэш коммита
FINAL_COMMIT_HASH=$(git rev-parse --short HEAD)

echo ""
echo "✅ Готово!"
echo ""
echo "🌐 CDN URL (с хэшем коммита):"
echo "   https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@$FINAL_COMMIT_HASH/dist"
echo ""
echo "📝 Используйте в .env:"
echo "   VITE_YURSERVICE_CDN_URL=https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@$FINAL_COMMIT_HASH/dist"
echo ""
echo "📋 Файлы:"
echo "   - yurservice-microfrontend.umd.js"
[ -f "dist/yurservice-microfrontend.umd.css" ] && echo "   - yurservice-microfrontend.umd.css"

# Очистка
cd - > /dev/null
rm -rf "$TEMP_DIR"
