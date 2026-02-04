-- Check what's in the nc_news database (Run this command)
-- psql -d nc_news -f check-database.sql > output.txt


-- Check what's in the nc_news_test database (Run this command)
-- psql -d nc_news_test -f check-database.sql > output-test.txt

-- List all tables
\dt

-- Check topics table
SELECT * FROM topics;

-- Check users table
SELECT * FROM users;

-- Check articles table
SELECT * FROM articles;

-- Check comments table
SELECT * FROM comments;
