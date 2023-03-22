const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

/* app.use((req: any, res: any, next: any) => {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Content-Security-Policy": "default-src *",
      "X-Content-Security-Policy": "default-src *",
      "X-WebKit-CSP": "default-src *"
  })
  next();
}); */

app.use(express.static(path.join(__dirname, '../../dist')));
app.listen(PORT, () => {
  console.log(`__dirname: ${__dirname}`);
  console.log(`Мой порт: ${PORT}`);
});
