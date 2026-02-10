# NC News Seeding

Live deployment: https://nc-news-764k.onrender.com/

Instructions for this sprint can be found at https://l2c.northcoders.com/courses/be/seeding-nc-news

## Environment Setup

To run this project locally, you need to create two `.env` files in the root directory:

### Required Files

1. **`.env.development`**

   ```
   PGDATABASE=nc_news
   ```

2. **`.env.test`**
   ```
   PGDATABASE=nc_news_test
   ```

These files specify which database to connect to for development and testing environments.
