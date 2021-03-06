const express = require("express");

const {
  getTopics,
  getArticleById,
  getUser,
  patchArticle,
  getArticles,
} = require("./controllers/news.controllers");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.patch("/api/articles/:article_id", patchArticle);
app.get("/api/users", getUser);
app.get("/api/articles", getArticles);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});
app.use((err, req, res, next) => {
  const invReqCodes = ["22P02"];
  if (invReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "Invalid request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
