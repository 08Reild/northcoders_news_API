\c nc_news_test

SELECT *
FROM articles
LEFT JOIN articles ON articles.author = comments.author;

SELECT * FROM articles;
SELECT * FROM comments;