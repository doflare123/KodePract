# KodePract
 
# Кто я? - Сакович Роман

## 1. Ознакомление с требованиями
- Изучить задание, дизайн в Figma и API.
- Выявить ключевые функциональные требования.
- Определить технологии и инструменты для разработки.

## 2. Настройка проекта
- Создать новый Vite-проект на основе `react-ts`.
- Установить необходимые зависимости:
  ```sh
  npm create vite kode-intership-2025-react --template react-ts
  cd kode-intership-2025-react
  npm install
  npm install react-router-dom axios
  ```
- Настроить структуру проекта (компоненты, роутинг, стили).

## 3. Реализация базовых компонентов
### 3.1 Top App Bar
- Поле поиска.
- Кнопка «Сортировка».
- Панель вкладок.
- Логика фильтрации списка работников.

### 3.2 Список пользователей
- Запрос к API для получения пользователей.
- Отображение списка пользователей.
- Логика сортировки (по алфавиту, по дню рождения).
- Фильтрация по отделам.

### 3.3 Обработка состояний
- Загрузка данных.
- Пустой результат поиска.

## 4. Фильтрация и сортировка
- Реализация поиска по имени, фамилии, никнейму.
- Реализация сортировки по алфавиту и дате рождения.

## 5. Реализация страницы деталей
- Отдельный роут для детальной информации о пользователе.
- Отображение аватарки, ФИО, никнейма, отдела, даты рождения, телефона.
- Реализация кнопки назад.