# Название проекта
Проектная работа Sprint 4

## Содержание
- [Технологии](#технологии) 
- [Сборка и контейнеризация](#сборка-и-контейнеризация)
- [Требования](#требования)
- [Эскизы экранов проекта](#эскизы-экранов-проекта)
- [Testing](#testing)
- [Linting](#linting)
- [Precommit hook](#precommit-hook)
- [Хостинг](#хостинг)
- [Pull request](#pull-request)


### Технологии
- [Webpack](https://webpack.js.org/)
- [Handlebarsjs](https://handlebarsjs.com/)
- [Node JS](https://nodejs.org/en/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Mocha](https://mochajs.org/)
- [Docker](https://www.docker.com/)
- [Yandex Cloud](https://cloud.yandex.com/en-ru/)

### Сборка и контейнеризация
Проект реализован на Typescript. Сборка проекта осуществляется в VSCode с помощью  webpack для DEV и Prom сред с помощью скриптов

Сборка и запуск в DEV среде с помощью webpack-dev-server - сервер запускается на порту 9000
```
webpack serve --mode=none
```

Сборка для контейнеризации
```
webpack --config ./webpack.config.js --mode=none
```

Локальный запуск без контейнера - в этом случае в консоль выводятся порт на котором запущен express server (3000)
```
node ./server.js
listening on  3000
```

Контейнеризация
```
docker build --pull --rm -f "Dockerfile" -t theochat:dev "."
```

Локальный запуск Docker контейнера на порту 3000
```
docker run -d -p 3000:3000 theochat:dev
```

Создание Container registry в YC - создан с ID=crprso09bfgobrji6lha
```
yc container registry create --name theo-registry
```

Tagging локального образа theochat:dev в соответствии с Container registry ID 
```
docker tag theochat:dev cr.yandex/crprso09bfgobrji6lha/theochat:dev
```

Push docker image to YC
```
docker push cr.yandex/crprso09bfgobrji6lha/theochat:dev
```


### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v18.14.0


### Эскизы экранов проекта
https://www.figma.com/file/czgVwSwTwVXR7bsZkTCPpq/ChatDesign?node-id=0%3A1&t=fprZOeuuS8Qe8bnG-1


### Testing
В проекте использовался тестовый фреймворк Mocha - тесты запускаются командой

```
npm run test
```

### Linting
В проекте использовались следующие линтеры - проверки проходят без ошибок

```
npm run lint
```
### Precommit hook
В проекте создан precommit hook с помощью **husky**
Конфигурация задана в файле .huskyrc.json и в качестве хука используется скрипт **npm test**

### Хостинг

Проект задеплоен в виде Docker образа в Serverless container в Yandex Cloud и доступен по публичной ссылке
https://bba76kud7c339tn51f0j.containers.yandexcloud.net/


### Pull request
https://github.com/theotheo46/middle.messenger.praktikum.yandex/pull/5
