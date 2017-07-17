# [Техническое Задание](chronist/roadmap#2) #

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
### Компиляция данных
Желательно использовать GitBash или WSL в зависимости от рабочего окружения
```bash
bash bin/prepareData.sh
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


#Project todo
----------------

#Bugs
 - [] На геособытиях отображается только событие этого года. лента не растёт.
 - [] Электрический звонок с говнопробелами &nbsp;


## UI
- [ ] добавить сетку на море
- [ ] Форма подписи внутри демо #18
- [ ] Форма обратной связи #19
- [ ] reduce css {C}
- [ ] local css {C}
- [ ] less cleaning {C}
- [ ] Filters {C}
- [ ] Запилить настроечки с цветовым темами {B}
- [ ] Настройку положения icon-bar и side-bar {B}
- [ ] Dynamic legend #big {C}
- [ ] Мобильные евенты {A}
- [ ] Shadows for map {B}
- [ ] Тултипы для меню #21
- [ ] Кука аналитика #20
- [ ] Форма подписи внутри демо #18
- [ ] Починить обводку событий #16
- [ ] Changelog #7

## Sidenav
- [ ] as

##Intro
- [ ] Mouse interference make sync off slide with id {C}

##Modal
- [ ] сделать ограничение по форме инпута {B}
- [ ] сделать вопросы обязательные {B}

##Timeline
- [ ] Extend functionality with brush and expandent stuff {C}

##MapControls


##DONE
- [x] FAQ #17
- [x] Shadows for map labels {B}
- [x] React LifeCycle
- [x] Feed
- [x] Исправить интро. ДОбавить туда надписи обучающие.
- [x] Убрать спагетти для интро
- [x] Всё залинтить
- [x] Субскрайб кнопки в Survey
- [x] Починить YM [URGENT]
- [x] запилить кнопки перехода
- [x] убрать яндекс метрику для дева
- [x] Исправить вьюпорт
- [x] Сделать евенты он ховер и прочее чтоб смотрелось ок  в ведре
- [x] исправить корячующуюся картинку сергея
- [x] сделать роутер
- [x]  adjust sidenav height for mobile too
- [x] fix abomination in settings
- [x] В ленте кнопки экспорта стоит зафиксировать для быстрого доступа, так как когда много информации они уезжают очень низко и до них не долистывают.
- [x] сделать нормальные контайнеры в которые влезают всё. Т.е. сделать ужее.
- [x] уменьшить шрифты вместе с сужением.
- [x] Make all pics in svg.co
- [x] fix ym
- [x] fix console.log(ym)
- [x] ?_ym_debug=0
- [x] Adapting to mobile
- [x] починить timeline responsivness
- [x] тама надо цсс править будет в интро и ещё тут там. ширина будет менятся
- [x] и надо будет элемент запилить который всплывашку с годами будет показывать
- [x] и ещё где то отображение года постоянное
- [x] переписать с нормальными реакторовскими лисенерами и чтоб <g transform> можно было
- [x] поправить шрифты
- [x] key={option} is harmful. learn why and fix
- [x] Intro autoscroll speed set to 4000
- [x] в анкете где "контакт для связи" надо поле сделать для почты
- [x] сделать универсальный json based опросник
- [x] Full width on mobile
- [x] BUG Autoscroll stop randomly when pauseOnHover: true
- [x] увеличить задержу.
- [x] проследить чтоб совпадало подсветка с описание
- [x] увеличить кнопку OK в интро
- [x] Mobile friendly markup


