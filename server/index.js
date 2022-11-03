// server/index.js

import express from "express"
import path from "path"


const PORT = process.env.PORT || 3001;
const __dirname = path.resolve()
console.log(__dirname)
const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});