# Error Handling

## Structure

Error handling middleware lives in the `/errors` folder.

## Error Types

### 404 - Not Found

**Invalid path**

```json
{ "msg": "Path not found" }
```

**Resource doesn't exist**

```json
{ "msg": "Article not found" }
```

### 405 - Method Not Allowed

When using unsupported HTTP methods on valid endpoints.

```json
{ "msg": "Method not allowed" }
```

### 500 - Internal Server Error

Catches everything else (database errors, crashes, etc).

```json
{ "msg": "Internal Server Error" }
```

## Middleware Order (in app.js)

```javascript
app.use(handleNotFound); // 404 for invalid paths
app.use(handleCustomErrors); // Custom errors with status & msg
app.use(handleServerErrors); // 500 for everything else
```

Order matters - Express processes these top to bottom.

## Using in Controllers

Throw an error inside promises:

```javascript
.then((article) => {
  if (!article) {
    throw { status: 404, msg: "Article not found" };
  }
  res.status(200).send({ article });
})
.catch(next);
```

The `.catch(next)` passes the error to Express, which finds the error middleware (functions with 4 parameters).

## Testing

Test for:

- Invalid endpoints (404)
- Invalid methods (405)
- Non-existent resources (404)
- Invalid parameters (400)
