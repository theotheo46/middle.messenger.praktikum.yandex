// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const path = require('path');
const PORT = 3000;
const app = express();

 app.use((req, res, next) => {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Content-Security-Policy": "default-src *",
      "X-Content-Security-Policy": "default-src *",
      "X-WebKit-CSP": "default-src *"
  })
  next();
}); 

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../../dist')));
app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`__dirname: ${__dirname}`);
  console.log(`Мой порт: ${PORT}`);
});
