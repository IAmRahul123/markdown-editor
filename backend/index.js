const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
    console.log("reqqq",req)
  const markdownText = req.body.markdown;
  const html = marked.parse(markdownText);
  res.send({ html });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
