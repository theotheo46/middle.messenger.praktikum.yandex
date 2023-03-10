# Название проекта
Проектная работа Sprint 2

## Содержание
- [Технологии](#технологии) 
- [Сборка](#сборка)
- [Требования](#требования)
- [Эскизы экранов проекта](#эскизы-экранов-проекта)
- [Linting](#linting)
- [Netlify](#netlify)
- [Pull request](#pull-request)


### Технологии
- [Parcel](https://parceljs.org/)
- [Handlebarsjs](https://handlebarsjs.com/)
- [Node JS](https://nodejs.org/en/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Typescript](https://www.typescriptlang.org/)

### Сборка
Проект реализован на Typescript. Сборка проекта осуществляется в VSCode с помощью скриптов

Сборка и запуск в DEV среде с помощью parcel
```
parcel
```

Сборка и запуск express server
```
npm run build && node src/server/server.ts
```

В этом случае в консоль выводятся порт и значение текущей директории
```
__dirname: /home/theo/js/webmessenger/src/server
Мой порт: 3000
```


### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v18.14.0


### Эскизы экранов проекта
https://www.figma.com/file/czgVwSwTwVXR7bsZkTCPpq/ChatDesign?node-id=0%3A1&t=fprZOeuuS8Qe8bnG-1


### Linting
В проекте использовались следующие линтеры - проверки проходят без ошибок
#### ESLint
```
node_modules/.bin/eslint . --ext .ts
```
#### Stylelint
```
npx stylelint src/styles.module.pcss 
```


### Netlify
Проект выложен на хостинг-портал Netlify по ссылке:
https://gentle-basbousa-86713f.netlify.app/



### Pull request
https://github.com/theotheo46/middle.messenger.praktikum.yandex/pull/4
