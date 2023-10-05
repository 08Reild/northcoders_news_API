\c nc_news_test

SELECT *
FROM articles
LEFT JOIN articles ON articles.author = comments.author;





SELECT * FROM articles;
SELECT * FROM comments;


























    -- SELECT articles.*,
    -- COUNT(comments.comment_id) AS comment_count
    -- FROM articles
    -- LEFT JOIN comments 
    -- ON articles.article_id = comments.article_id
    -- GROUP BY articles.article_id
    -- ORDER BY articles.created_at DESC;

    -- SELECT * FROM comments