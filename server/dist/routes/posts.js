"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var posts_1 = require("../controllers/posts");
var router = express_1.default.Router();
// routes
router.post('/', posts_1.create);
router.get('/', posts_1.getAll);
router.post('/:id/comment', posts_1.comment);
router.post('/:id/like', posts_1.like);
router.patch('/:id', posts_1.update),
    router.delete('/:id', posts_1.remove);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJyb3V0ZXMvcG9zdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvREFBNkI7QUFDN0IsOENBQWtGO0FBRWxGLElBQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFL0IsU0FBUztBQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGNBQU0sQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGNBQU0sQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGVBQU8sQ0FBQyxDQUFBO0FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQUksQ0FBQyxDQUFBO0FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLGNBQU0sQ0FBQztJQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxjQUFNLENBQUMsQ0FBQTtBQUU3QixrQkFBZSxNQUFNLENBQUEifQ==