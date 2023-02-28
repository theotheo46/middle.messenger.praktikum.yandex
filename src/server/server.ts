// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../../dist')));
app.listen(PORT, () => {
  console.log(`__dirname: ${__dirname}`);
  console.log(`Мой порт: ${PORT}`);
});
