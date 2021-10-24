"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getAll = exports.create = exports.update = exports.comment = exports.like = void 0;
var posts_js_1 = __importDefault(require("../models/posts.js"));
var posts_js_2 = __importDefault(require("../models/posts.js"));
var users_1 = __importDefault(require("../models/users"));
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, posts_js_2.default.aggregate([{
                            $lookup: {
                                from: "users",
                                localField: "user",
                                foreignField: "_id",
                                as: "userProfile"
                            }
                        }]).sort('-createdAt')];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, posts];
            }
        });
    });
}
exports.getAll = getAll;
function create(postParam) {
    return __awaiter(this, void 0, void 0, function () {
        var user, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_1.default.findById(postParam.user)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw ('User not found');
                    }
                    post = new posts_js_1.default(postParam);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function update(id, postParam) {
    return __awaiter(this, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, posts_js_1.default.findById(id)];
                case 1:
                    post = _a.sent();
                    if (!post)
                        throw 'Post not found';
                    Object.assign(post, postParam);
                    return [4 /*yield*/, post.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.update = update;
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, posts_js_1.default.findByIdAndRemove(id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function like(id, param) {
    return __awaiter(this, void 0, void 0, function () {
        var post, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, posts_js_1.default.findById(id)];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, users_1.default.findById(param.user)];
                case 2:
                    user = _a.sent();
                    if (!post || !user) {
                        throw 'Post or User not found';
                    }
                    if (post.likes.includes(param.user))
                        throw 'Already liked';
                    post.likes.push(param.user);
                    post.save();
                    return [2 /*return*/];
            }
        });
    });
}
exports.like = like;
function comment(id, commentParam) {
    return __awaiter(this, void 0, void 0, function () {
        var post, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, posts_js_1.default.findById(id)];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, users_1.default.findById(commentParam.user)];
                case 2:
                    user = _a.sent();
                    if (!post || !user)
                        throw 'Post not found';
                    post.comments.push(commentParam);
                    post.save();
                    return [2 /*return*/];
            }
        });
    });
}
exports.comment = comment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9wb3N0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBb0Q7QUFDcEQsZ0VBQWtEO0FBQ2xELDBEQUFrQztBQUVsQyxTQUFlLE1BQU07Ozs7O3dCQUVGLHFCQUFNLGtCQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ2xDLE9BQU8sRUFBQztnQ0FDSixJQUFJLEVBQUUsT0FBTztnQ0FDYixVQUFVLEVBQUUsTUFBTTtnQ0FDbEIsWUFBWSxFQUFFLEtBQUs7Z0NBQ25CLEVBQUUsRUFBRSxhQUFhOzZCQUNwQjt5QkFDSixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUE7O29CQVBoQixLQUFLLEdBQUksU0FPTztvQkFDdEIsc0JBQU8sS0FBSyxFQUFBOzs7O0NBQ2Y7QUFxREcsd0JBQU07QUFuRFYsU0FBZSxNQUFNLENBQUMsU0FBaUI7Ozs7O3dCQUN0QixxQkFBTSxlQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0JBQTFDLElBQUksR0FBRyxTQUFtQztvQkFDaEQsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDUCxNQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtxQkFDMUI7b0JBRUssSUFBSSxHQUFHLElBQUksa0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFFaEMscUJBQU0sSUFBSSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBakIsU0FBaUIsQ0FBQzs7Ozs7Q0FDckI7QUF5Q0csd0JBQU07QUF2Q1YsU0FBZSxNQUFNLENBQUMsRUFBVSxFQUFFLFNBQWlCOzs7Ozt3QkFDbEMscUJBQU0sa0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUE7O29CQUE5QixJQUFJLEdBQUcsU0FBdUI7b0JBRXBDLElBQUksQ0FBQyxJQUFJO3dCQUFFLE1BQU0sZ0JBQWdCLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUUvQixxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUFqQixTQUFpQixDQUFDOzs7OztDQUNyQjtBQStCRyx3QkFBTTtBQTdCVixTQUFlLE1BQU0sQ0FBQyxFQUFVOzs7O3dCQUM1QixxQkFBTSxrQkFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFBOztvQkFBaEMsU0FBZ0MsQ0FBQzs7Ozs7Q0FDcEM7QUE4Qkcsd0JBQU07QUE1QlYsU0FBZSxJQUFJLENBQUMsRUFBVSxFQUFFLEtBQXFCOzs7Ozt3QkFDcEMscUJBQU0sa0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUE7O29CQUE5QixJQUFJLEdBQUcsU0FBdUI7b0JBQ3ZCLHFCQUFNLGVBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFBdEMsSUFBSSxHQUFHLFNBQStCO29CQUU1QyxJQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNmLE1BQU0sd0JBQXdCLENBQUE7cUJBQ2pDO29CQUNELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFBRSxNQUFNLGVBQWUsQ0FBQTtvQkFFekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7Ozs7O0NBQ2Q7QUFZRyxvQkFBSTtBQVZSLFNBQWUsT0FBTyxDQUFDLEVBQVUsRUFBRSxZQUFzQjs7Ozs7d0JBQ3hDLHFCQUFNLGtCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFBOztvQkFBOUIsSUFBSSxHQUFHLFNBQXVCO29CQUN2QixxQkFBTSxlQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0JBQTdDLElBQUksR0FBRyxTQUFzQztvQkFDbkQsSUFBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUk7d0JBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtvQkFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7b0JBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTs7Ozs7Q0FDZDtBQUlHLDBCQUFPIn0=