const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverredide = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/markdown-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverredide('_method'));

app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'desc',
  });
  res.render('articles/index', { articles });
});

app.listen(5000);
