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


бифокальная линца
ловушка для лобстеро
циркулярная пила


#Project todo
----------------
## UI
- [ ] New Map UI with Lnr icons.
  - [ ] Rework with timeline stuff
  - [ ] Rework with mobile UI for map
  - [ ] Cry. Cry a lot.
  - [
]- [ ] добавить сетку на море
- [ ] Filters {C}
- [ ] Запилить настроечки с цветовым темами {B}
- [ ] Dynamic legend #big {C}
- [ ] Мобильные евенты {A}
- [ ] feed unresponsive когда play
- [ ] Changelog #7
- [ ] Кука аналитика #20
- [ ] Extend functionality with brush and expandent stuff {C}
- [ ] as
- [ ] Mouse interference make sync off slide with id {C}
- [ ] animation of expedition and stuff.

##DONE
- [x] сменить шрифты
- [x] reduce amount css {C}
- [x] less cleaning {C}
- [x] Форма обратной связи #19
- [x] Форма подписи внутри демо #18
- [x] Настройку положения icon-bar и side-bar {B}
- [x] Shadows for map {B}
- [x] Тултипы для меню #21
- [x] Форма подписи внутри демо #18
- [x] Починить обводку событий #16
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


##WARNINGS:

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN less-loader@4.0.5 requires a peer of less@^2.3.1 but none was installed.
npm WARN flag@2.0.4 requires a peer of react@^15.5.4 but none was installed.
npm WARN react-dom@15.6.2 requires a peer of react@^15.6.2 but none was installed.
npm WARN slick-carousel@1.8.1 requires a peer of jquery@>=1.8.0 but none was installed.
npm WARN react-addons-css-transition-group@15.6.2 requires a peer of react@^15.4.2 but none was installed.
npm WARN react-slick@0.15.4 requires a peer of react@^0.14.0 || ^15.0.1 but none was installed.
npm WARN react-slick@0.15.4 requires a peer of react-dom@^0.14.0 || ^15.0.1 but none was installed.
npm WARN redux-devtools@3.4.0 requires a peer of react@^0.14.9 || ^15.3.0 but none was installed.
npm WARN redux-devtools-log-monitor@1.3.0 requires a peer of react@^0.14.9 || ^15.3.0 but none was installed.
npm WARN redux-devtools-dock-monitor@1.1.2 requires a peer of react@^0.14.9 || ^15.3.0 but none was installed.
npm WARN react-json-tree@0.10.9 requires a peer of react@^15.0.0 but none was installed.
npm WARN react-json-tree@0.10.9 requires a peer of react-dom@^15.0.0 but none was installed.


offsetHeight
:
209
offsetTop
:
381
offsetTop
:
716


-[x] выделить в отдельный комп SeekBar
-[x] event listener на ресайз
-[] проверить rAF на пустом компоненте
-[] забацать заменут тултипам
-[] заменить часть бутстрапа на глагне



- кнопка перключения языка на главно
- и в панеле
- в курсе икноки новые вытащить
- без бутстрапа
