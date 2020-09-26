const express = require('express')
const app = express()
const port = 8000

let link = '?question=answer';
// app.get('/get-time', (req, res) => {
//   const data = {
//     time: Date.now()
//   }
//   res.send(data);
// })

app.get('/get-time', (req, res) => {
    res.send(req.query);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})