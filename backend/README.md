**API: Articles**

- **Base URL**: `http://localhost:5000`

- **Create Article**: `POST /api/v1/articles` : Body `{"tag":"<tag>","content":"<text>"}` — Returns `201 { message, article }`.
- **List Articles**: `GET /api/v1/articles` : Query `p` (page, default 1), `limit` (default 10), `tag`, `startDate`, `endDate` — Returns `200 { message, total, data }`.
- **Get Article**: `GET /api/v1/articles/:id` — Returns `200 { message, article }` or `404`.
- **Update Article**: `PATCH /api/v1/articles/:id` : Body can include `tag` and/or `content` — Returns `200 { message, article }` or `404`.
- **Delete Article**: `DELETE /api/v1/articles/:id` — Returns `204` or `404`.

**Validation & Notes**

- **Tags**: allowed values — `technical`, `brainrot`, `cultural`.
- **Pagination param**: use `p` (not `page`).
- **Errors**: `400` for bad input, `500` for server errors.
- **Port**: configured via `PORT` env (example: `5000`).
