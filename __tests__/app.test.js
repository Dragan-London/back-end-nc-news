const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("200: responds with an object containing an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics).toHaveLength(3);
      });
  });

  test("200: each topic object has slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).toBeGreaterThan(0);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("200: responds with an object containing an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
      });
  });

  test("200: each article has all required properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(Number));
        });
      });
  });

  test("200: articles are sorted by created_at in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("200: articles do not have a body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).not.toHaveProperty("body");
        });
      });
  });

  test("200: accepts sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("votes", { descending: true });
      });
  });

  test("200: accepts order query", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { ascending: true });
      });
  });

  test("400: responds with error for invalid sort_by column", () => {
    return request(app)
      .get("/api/articles?sort_by=invalid_column")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("200: filters articles by topic query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });

  test("404: responds with error for topic that does not exist", () => {
    return request(app)
      .get("/api/articles?topic=not_a_topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with an object containing an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toBeInstanceOf(Array);
        expect(body.users).toHaveLength(4);
      });
  });

  test("200: each user object has username, name, and avatar_url properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBeGreaterThan(0);
        body.users.forEach((user) => {
          expect(user).toHaveProperty("username", expect.any(String));
          expect(user).toHaveProperty("name", expect.any(String));
          expect(user).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: user will get an article by its id containing author,title,article_id,body,topic,created_at,votes and article_img_url", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toBeInstanceOf(Object);
        expect(body.article).toHaveProperty("author", expect.any(String));
        expect(body.article).toHaveProperty("title", expect.any(String));
        expect(body.article).toHaveProperty("article_id", 1);
        expect(body.article).toHaveProperty("body", expect.any(String));
        expect(body.article).toHaveProperty("topic", expect.any(String));
        expect(body.article).toHaveProperty("created_at", expect.any(String));
        expect(body.article).toHaveProperty("votes", expect.any(Number));
        expect(body.article).toHaveProperty(
          "article_img_url",
          expect.any(String),
        );
      });
  });

  test("comment_count 200: article response includes comment_count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveProperty(
          "comment_count",
          expect.any(Number),
        );
      });
  });

  test("404: responds with error when article doesn't exist", () => {
    return request(app)
      .get("/api/articles/987")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  // test("400: responds with error when article_id is invalid", () => {
  //   return request(app)
  //     .get("/api/articles/not-a-number")
  //     .expect(400)
  //     .then(({ body }) => {
  //       expect(body.msg).toBe("Bad request");
  //     });
  // });

  test("405: Method not allowed for unsupported methods", () => {
    return request(app)
      .post("/api/articles/1")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("Method not allowed");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments for the given article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments.length).toBeGreaterThan(0);
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("article_id", 1);
        });
      });
  });

  test("200: comments are sorted by created_at in descending order (most recent first)", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("200: responds with empty array when article exists but has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });

  test("404: responds with error when article doesn't exist", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: successfully posts a comment and returns the posted comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toHaveProperty("comment_id", expect.any(Number));
        expect(body.comment).toHaveProperty("author", "butter_bridge");
        expect(body.comment).toHaveProperty("body", "This is a test comment");
        expect(body.comment).toHaveProperty("article_id", 1);
        expect(body.comment).toHaveProperty("votes", expect.any(Number));
        expect(body.comment).toHaveProperty("created_at", expect.any(String));
      });
  });

  test("404: responds with error when article doesn't exist", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  test("400: responds with error when missing required fields", () => {
    const newComment = {
      username: "butter_bridge",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: successfully updates article votes and returns updated article", () => {
    const voteUpdate = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveProperty("article_id", 1);
        expect(body.article).toHaveProperty("votes", 101);
        expect(body.article).toHaveProperty("title", expect.any(String));
        expect(body.article).toHaveProperty("author", expect.any(String));
        expect(body.article).toHaveProperty("body", expect.any(String));
        expect(body.article).toHaveProperty("topic", expect.any(String));
        expect(body.article).toHaveProperty("created_at", expect.any(String));
        expect(body.article).toHaveProperty(
          "article_img_url",
          expect.any(String),
        );
      });
  });

  test("200: successfully decrements article votes", () => {
    const voteUpdate = { inc_votes: -10 };

    return request(app)
      .patch("/api/articles/1")
      .send(voteUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article.votes).toBe(90);
      });
  });

  test("404: responds with error when article doesn't exist", () => {
    const voteUpdate = { inc_votes: 1 };

    return request(app)
      .patch("/api/articles/9999")
      .send(voteUpdate)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  test("400: responds with error when inc_votes is missing", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: successfully deletes a comment and returns no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  test("404: responds with error when comment doesn't exist", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment not found");
      });
  });
});

describe("Invalid Methods", () => {
  test("405: POST /api/topics - Method not allowed", () => {
    return request(app)
      .post("/api/topics")
      .send({ slug: "new", description: "test" })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("Method not allowed");
      });
  });

  test("405: DELETE /api/articles - Method not allowed", () => {
    return request(app)
      .delete("/api/articles")
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("Method not allowed");
      });
  });

  test("405: POST /api/users - Method not allowed", () => {
    return request(app)
      .post("/api/users")
      .send({ username: "test", name: "Test User" })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("Method not allowed");
      });
  });
});

describe("Invalid Endpoint", () => {
  test("404: Responds with a message when path is not found", () => {
    return request(app)
      .get("/api/invalid-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});
