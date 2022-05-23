# Greece.ru

**ВНИМАНИЕ** Проект делался относительно давно. Для запуска нужен nodeJS 10-й или 11-й версии, ибо версии 12+ не поддерживают то, что нужно gulp 3, с которым сделана автоматизация. Рекомендовано использовать nvm.

<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%"><code>npm i</code></td>
      <td>Установить зависимости</td>
    </tr>
    <tr>
      <td><code>npm start</code></td>
      <td>Запустить сборку, сервер и слежение за файлами</td>
    </tr>
    <tr>
      <td><code>npm start ЗАДАЧА</code></td>
      <td>Запустить задачу с названием ЗАДАЧА (список задач в <code>gulpfile.js</code>)</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>Сборка проекта без карт кода (сжатый вид, как результат работы)</td>
    </tr>
    <tr>
      <td><code>npm run deploy</code></td>
      <td>Сборка проекта без карт кода и отправка содержимого папки сборки на github-pages (для корректного сообщения адреса просмотра введите его в <code>./package.json</code>)</td>
    </tr>
    <tr>
      <td><code>npm run test:style</code></td>
      <td>Проверка стилевой составляющей проекта <a href="https://stylelint.io/">stylelint</a></td>
    </tr>
    <tr>
      <td><code>npm run test:orpho</code></td>
      <td>Поиск ошибок и опечаток в <code>.html</code> и <code>.md</code> файлах в <code>./src</code> с помощью <a href="https://github.com/hcodes/yaspeller">yaspeller</a></td>
    </tr>
  </tbody>
</table>

Если при вызове `npm start` ничего не происходит, смотрите `./projectConfig.json`, он содержит синтаксическую ошибку. Проверить можно [линтером](http://jsonlint.com/)



## Парадигма

- Используется именование классов, файлов и переменных по БЭМ.
- Список использованных в проекте БЭМ-блоков и доп. файлов указан в `./projectConfig.json`.
- Каждый БЭМ-блок в своей папке внутри `./src/blocks/` (стили, js, картинки, разметка; обязателен только стилевой файл).
- Есть глобальные файлы: стилевые, js, шрифты, картинки.
- Диспетчер подключения стилей `./src/scss/style.scss` генерируется автоматически при старте любой gulp-задачи.
- Для разметки можно использовать [микрошаблонизацию](https://www.npmjs.com/package/gulp-file-include). А можно и не использовать.
- Перед созданием коммита запускается проверка стилевых файлов и проверка орфографии в `.html` и `.md` файлах, входящих в коммит.



### Стили

Файл-диспетчер подключений (`.src/scss/style.scss`) формируется автоматически на основании указанных в `./projectConfig.json` блоков и доп. файлов. Писать в `.src/scss/style.scss` что-либо руками бессмысленно: при старте автоматизации файл будет перезаписан.

Используемый постпроцессинг:

1. [autoprefixer](https://github.com/postcss/autoprefixer)
2. [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
3. [postcss-import](https://github.com/postcss/postcss-import)
4. [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg)
5. [gulp-cleancss](https://github.com/mgcrea/gulp-cleancss) (только в режиме сборки без карт кода)



### Блоки

Каждый блок лежит в `./src/blocks/` в своей папке. Каждый блок — как минимум, папка и одноимённый scss-файл.

Возможное содержимое блока:

```bash
demo-block/               # Папка блока
  img/                    # Изображения, используемые блоком и обрабатываемые автоматикой сборки
  some-folder/            # Какая-то сторонняя папка, не обрабатываемая автоматикой
  demo-block.scss         # Стилевой файл блока
  demo-block--mod.scss    # Отдельный стилевой файл БЭМ-модификатора блока
  demo-block.js           # js-файл блока
  demo-block--mod.js      # js-файл для отдельного БЭМ-модификатора блока
  demo-block.html         # Варианты разметки (как документация блока или как вставляемый микрошаблонизатором фрагмент)
  readme.md               # Какое-то пояснение
```



### Подключение блоков

Список используемых блоков и дополнительных подключаемых файлов указан в `./projectConfig.json`. Список файлов и папок, взятых в обработку можно увидеть в терминале, если раскомментировать строку `console.log(lists);` в `gulpfile.js`.

#### `blocks`

Объект с блоками, используемыми на проекте. Каждый блок — отдельная папка с файлами, по умолчанию лежат в `./src/blocks/`.

Каждое подключение блока — массив, который можно оставить пустым или указать файлы элементов или модификаторов, если они написаны в виде отдельных файлов. В обоих случаях в обработку будут взяты одноименные стилевые файлы, js-файлы и картинки из папки `img/` блока.

Пример, подключающий 3 блока:

```
"blocks": {
  "page": [],
  "page-header": [],
  "page-footer": []
}
```

#### `addCssBefore`

Массив с дополнительными стилевыми файлами, которые будут взяты в компиляцию ПЕРЕД стилевыми файлами блоков.

Пример, берущий в компиляцию переменные, примеси, функции и один дополнительный файл из папки зависимостей (он будет преобразован в css-импорт, который при постпроцессинге ([postcss-import](https://github.com/postcss/postcss-import)) будет заменен на содержимое файла).

```
"addCssBefore": [
  "./src/scss/variables.scss",
  "./src/scss/mixins.scss",
  "./src/scss/functions.scss",
  "../../node_modules/owl.carousel/dist/assets/owl.carousel.css"
],
```

#### `addCssAfter`

Массив с дополнительными стилевыми файлами, которые будут взяты в компиляцию ПОСЛЕ стилевых файлов блоков.

```
"addCssAfter": [
  "./src/scss/print.scss"
],
```

#### `singleCompiled`

Массив стилевых файлов, которые будут скомпилированы независимо.

Пример: указанный файл будет скомпилирован в папку сборки как `blocks-library.css`

```
"singleCompiled": [
  "./src/scss/blocks-library.scss"
],
```

#### `addJsBefore`

Массив js-файлов, которые будут взяты в обработку (конкатенация/сжатие) ПЕРЕД js-файлами блоков.

Пример, добавляющий в список обрабатываемых js-файлов несколько зависимостей:

```
"addJsBefore": [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/jquery-migrate/dist/jquery-migrate.min.js",
  "./node_modules/nouislider/distribute/nouislider.js"
],
```

#### `addJsAfter`

Массив js-файлов, которые будут взяты в обработку (конкатенация/сжатие) ПОСЛЕ js-файлов блоков.

Пример, добавляющий в конец списка обрабатываемых js-файлов глобальный скрипт.

```
"addJsAfter": [
  "./src/js/global-script.js"
],
```

#### `addImages`

Массив дополнительных изображений, добавляемый ПЕРЕД массивом изображений из блоков (внимание: при совпадении имен файлов, файлы из блоков имеют более высокий приоритет и затрут файлы из этого массива).

```
"addImages": [
  "./src/img/*.{jpg,jpeg,gif,png,svg,ico}"
],
```

#### `copiedCss`

Массив css-файлов, которые копируются в папку сборки, подпапку `css/`

#### `copiedJs`

Массив js-файлов, которые копируются в папку сборки, подпапку `js/`

**ВНИМАНИЕ!** Это JSON. Это строгий синтаксис, у последнего элемента в любом контексте не должно быть запятой в конце строки.

#### Пример секции в `./projectConfig.json`

```json
{
  "blocks": {
    "page-header": [],
    "page-footer": [
      "__extra-element",
      "--extra-modifier"
    ]
  },
  "addCssBefore": [
    "./src/scss/variables.scss"
  ],
  "addCssAfter": [
    "./src/scss/print.scss"
  ],
  "singleCompiled": [],
  "addJsBefore": [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/jquery-migrate/dist/jquery-migrate.min.js"
  ],
  "addJsAfter": [
    "./src/js/global-script.js"
  ],
  "addImages": [
    "./src/img/*.{jpg,jpeg,gif,png,svg}"
  ],
  "copiedCss": [],
  "copiedJs": [],
  "dirs": {
    "srcPath": "./src/",
    "buildPath": "./build/",
    "blocksDirName": "blocks"
  }
}
```

В результате в обработку будут взяты (в указанной последовательности):

```bash
css:
 [ './src/scss/variables.scss',
   './src/blocks/page-header/page-header.scss',
   './src/blocks/page-footer/page-footer.scss',
   './src/blocks/page-footer/page-footer__extra-element.scss',
   './src/blocks/page-footer/page-footer--extra-modifier.scss',
   './src/scss/print.scss' ],
js:
 [ './node_modules/jquery/dist/jquery.min.js',
   './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
   './src/blocks/page-header/page-header.js',
   './src/blocks/page-footer/page-footer.js',
   './src/blocks/page-footer/page-footer__extra-element.js',
   './src/blocks/page-footer/page-footer--extra-modifier.js',
   './src/js/global-script.js' ],
img:
 [ './src/img/*.{jpg,jpeg,gif,png,svg}',
   './src/blocks/page-header/img/*.{jpg,jpeg,gif,png,svg}',
   './src/blocks/page-footer/img/*.{jpg,jpeg,gif,png,svg}' ]
```



### Удобное создание нового блока

Предусмотрена команда для быстрого создания файловой структуры нового блока.

```bash
# формат: node createBlock.js ИМЯБЛОКА [доп. расширения через пробел]
node createBlock.js block-1 # создаст папку блока, block-1.html, block-1.scss и подпапку img/ для этого блока
node createBlock.js block-2 js pug # создаст папку блока, block-2.html, block-2.scss, block-2.js, block-2.pug и подпапку img/ для этого блока
```

Если блок уже существует, файлы не будут затёрты, но создадутся те файлы, которые ещё не существуют.



## Назначение папок

```bash
build/          # Папка сборки, здесь работает сервер автообновлений.
src/            # Исходные файлы
  _include/     # - фрагменты html для вставки на страницы
  blocks/       # - блоки проекта
  css/          # - можно положить добавочные css-файлы (нужно подключить в copiedCss, иначе игнорируются)
  fonts/        # - можно положить шрифты проекта (будут автоматически скопированы в папку сборки)
  img/          # - можно положить добавочные картинки (нужно подключить в addImages, иначе игнорируются)
  js/           # - можно положить добавочные js-файлы (нужно подключить в addJsBefore, addJsAfter или copiedJs, иначе игнорируются)
  scss/         # - стили (style.scss скомпилируется, прочие нужно подключить в addCssBefore, addCssAfter или singleCompiled, иначе они будут проигнорированы)
  index.html    # - главная страница проекта
  blocks-demo.html # - библиотека блоков
```



## Комментирование для разработчиков

Для html-файлов можно использовать комментарии вида `<!--DEV Комментарий -->` — такие комментарии не попадут в собранный html.
