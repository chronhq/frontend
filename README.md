# [Техническое Задание](chronist/roadmap#2) #
# Начнем на коленке #

Данный проект содержит код прототипа отвечающий за визуальное представление

## Установка
### Первоначальное клонирование

`git clone ssh://git@gitlab.morlov.tk:10022/chronist/map-prototype.git  map-prototype --recursive`

### Если необходимо загрузить сабмодули
`git clone ssh://git@gitlab.morlov.tk:10022/chronist/map-prototype.git
git submodule update --init --recursive`

### Установка зависимостей
```bash
npm install
```

### Запуск Dev сервера

```bash
npm start
```

### Запуск Dev сервера c экспериментальным UI

```bash
npm run dev
```

### Использование Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools)
[redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor)

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position

### TODO
- [] Управление
  - [X] Старт/Стоп/Рестарт
  - [X] Ручная установка года
  - [X] Таймлайн
  - [] Выбор периода
  - [] Отображение всех событий за период
- [] Сайдбар-легенда
  - [] Список фактов
    - [X] За проигранный период
    - [X] За текущий год
    - [] Группировать по годам
    - [] Дополнительная информация о факте
- [] Карта
  - [] Переключение видимости слоёв
  - [] Города
    - [X] По годам
    - [X] Отображение на карте
    - [] Анимация появления/исчезновения
  - [] Факты
    - [X] По годам
    - [] Отображение на карте
    - [] Взаимосвязи между фактами
  - [] Политические границы
    - [X] По годам
    - [X] Отображение на карте
    - [] Анимация перехода
  - [] Скрытое
    - [] Люди
      - [] Выборка связанных фактов с человеком
- [] Группировка по регионам
- [] CRUD Админка
