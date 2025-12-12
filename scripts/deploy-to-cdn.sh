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

if [ ! -d ".git" ]; then
    echo "📁 Инициализируем git репозиторий..."
    git init
    git branch -M main
fi

if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Добавляем remote..."
    git remote add origin "$REPO_URL"
fi

echo "📝 Добавляем файлы..."
git add -f dist/
git add vite.config.ts src/index.ts package.json || true

if [ -n "$(git status --porcelain)" ]; then
    echo "💾 Создаем коммит..."
    git commit -m "Deploy microfrontend with bundled dependencies - $(date +%Y-%m-%d)" || echo "Нет изменений для коммита"
fi

echo "📤 Отправляем в репозиторий..."
git push origin "$BRANCH" || {
    echo "⚠️  Не удалось отправить. Возможно, нужно настроить доступ."
    echo "Выполните вручную:"
    echo "  git push origin $BRANCH"
}

echo ""
echo "✅ Готово!"
echo ""
echo "🌐 CDN URL:"
echo "   https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@$BRANCH/dist/yurservice-microfrontend.js"
echo ""
echo "📝 Используйте в .env:"
echo "   VITE_YURSERVICE_CDN_URL=https://cdn.jsdelivr.net/gh/global50/remote-yurservice-cdn@$BRANCH/dist"

