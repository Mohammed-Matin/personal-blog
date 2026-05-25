import { Router } from 'express';
import { createArticleController, getArticlesController, getArticleController, updateArticleController, deleteArticleController } from '../controller/article.controller.js';


const articleRouter = Router();

/**
 * [POST] - /api/v1/articles - Create a new article
 * req.body: { tag: string, content: string }
 * tag values: "technical", "brainrot", "cultural"
 */
articleRouter.post('/', createArticleController);

/**
 * [GET] - /api/v1/articles - get articles based on the query parameter
 * p - page number - default: 1, limit - no. of articles in a page - default - 10
 * tag - tags to be filter out - default - all, startDate - startDate & endDate - defualt - none  
 */
articleRouter.get('/', getArticlesController);

/**
 * [GET] - /api/v1/articles/:id - get a specific article by ID
 */
articleRouter.get('/:id', getArticleController);

/**
 * [PATCH] - /api/v1/articles/:id - update a specific article by ID
 */
articleRouter.patch('/:id', updateArticleController);

/**
 * [DELETE] - /api/v1/articles/:id - delete a specific article by ID
 */
articleRouter.delete('/:id', deleteArticleController);

export default articleRouter;