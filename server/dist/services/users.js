"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.findNearBy = exports.remove = exports.updateProfile = exports.updateImage = exports.update = exports.create = exports.getById = exports.getAll = exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var users_js_1 = __importDefault(require("../models/users.js"));
function authenticate(_a) {
    var username = _a.username, password = _a.password;
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findOne({ username: username })];
                case 1:
                    user = _b.sent();
                    if (user && bcryptjs_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password)) {
                        token = jsonwebtoken_1.default.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '1d' });
                        return [2 /*return*/, __assign(__assign({}, user.toJSON()), { token: token })];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.authenticate = authenticate;
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.find()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findById(id).lean()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getById = getById;
function create(userParam) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findOne({ $or: [{ username: userParam.username }, { email: userParam.email }] })];
                case 1:
                    // validate
                    //TODO: two different throws
                    if (_a.sent()) {
                        throw 'Username "' + userParam.username + '" is already taken';
                    }
                    user = new users_js_1.default(userParam);
                    // hash password
                    if (userParam.password) {
                        user.password = bcryptjs_1.default.hashSync(userParam.password, 10);
                    }
                    // save user
                    return [4 /*yield*/, user.save()];
                case 2:
                    // save user
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function update(id, userParam) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findById(id)];
                case 1:
                    user = _b.sent();
                    // validate
                    if (!user)
                        throw 'User not found';
                    _a = user.username !== userParam.username;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, users_js_1.default.findOne({ username: userParam.username })];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    if (_a) {
                        throw 'Username "' + userParam.username + '" is already taken';
                    }
                    // hash password if it was entered
                    if (userParam.password) {
                        userParam.password = bcryptjs_1.default.hashSync(userParam.password, 10);
                    }
                    userParam.edited = true;
                    // copy userParam properties to user
                    Object.assign(user, userParam);
                    return [4 /*yield*/, user.save()];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.update = update;
function updateProfile(id, userParam) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findById(id)];
                case 1:
                    user = _a.sent();
                    // validate
                    if (!user)
                        throw 'User not found';
                    // copy userParam properties to user
                    Object.assign(user.profile, userParam.profile);
                    return [4 /*yield*/, user.save()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateProfile = updateProfile;
function updateImage(id, imgURL) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userParam;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findById(id)];
                case 1:
                    user = _a.sent();
                    // validate
                    if (!user)
                        throw 'User not found';
                    if (imgURL) {
                        userParam = __assign(__assign({}, user), { profileImage: imgURL });
                    }
                    else {
                        throw 'Image not uploaded';
                    }
                    Object.assign(user, userParam);
                    return [4 /*yield*/, user.save()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateImage = updateImage;
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findByIdAndRemove(id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function findNearBy(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userLocation, nearByUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_js_1.default.findById(id)];
                case 1:
                    user = _a.sent();
                    userLocation = user === null || user === void 0 ? void 0 : user.profile.location.loc.coordinates;
                    return [4 /*yield*/, users_js_1.default.find({
                            "profile.location.loc": { $nearSphere: { $geometry: { type: "Point", coordinates: userLocation }, $maxDistance: 50000000000 } },
                            _id: { $ne: id }
                        })];
                case 2:
                    nearByUsers = _a.sent();
                    return [2 /*return*/, nearByUsers];
            }
        });
    });
}
exports.findNearBy = findNearBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUE4QjtBQUM5QixzREFBNkI7QUFDN0IsZ0VBQWdEO0FBRWhELFNBQWUsWUFBWSxDQUFDLEVBQTZCO1FBQTNCLFFBQVEsY0FBQSxFQUFFLFFBQVEsY0FBQTs7Ozs7d0JBQy9CLHFCQUFNLGtCQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQyxFQUFBOztvQkFBdkMsSUFBSSxHQUFHLFNBQWdDO29CQUM3QyxJQUFJLElBQUksSUFBSSxrQkFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQyxFQUFFO3dCQUNoRCxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ25GLDRDQUNPLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FDaEIsS0FBSyxPQUFBLEtBQ1A7cUJBQ0w7Ozs7O0NBQ0o7QUFrR0csb0NBQVk7QUEvRmhCLFNBQWUsTUFBTTs7Ozt3QkFDVixxQkFBTSxrQkFBSSxDQUFDLElBQUksRUFBRSxFQUFBO3dCQUF4QixzQkFBTyxTQUFpQixFQUFDOzs7O0NBQzVCO0FBOEZHLHdCQUFNO0FBNUZWLFNBQWUsT0FBTyxDQUFDLEVBQVU7Ozs7d0JBQ3RCLHFCQUFNLGtCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFBO3dCQUFyQyxzQkFBTyxTQUE4QixFQUFDOzs7O0NBQ3pD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