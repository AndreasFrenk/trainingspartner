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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearBy = exports.updateProfile = exports.updateImage = exports.getCurrent = exports.remove = exports.updateUser = exports.register = exports.getById = exports.getAll = exports.authenticate = void 0;
var userService = __importStar(require("../services/users.js"));
var path_1 = __importDefault(require("path"));
// sorry for bad typing 
var authenticate = function (req, res, next) {
    userService.authenticate(req.body)
        // .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .then(function (user) {
        if (user) {
            var filteredUser = Object.assign({}, user);
            filteredUser === null || filteredUser === void 0 ? true : delete filteredUser.password;
            res.json(filteredUser);
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(function (err) { return next(err); });
};
exports.authenticate = authenticate;
var register = function (req, res, next) {
    userService.create(req.body)
        .then(function () { return res.status(200).json({}); })
        .catch(function (err) { return next(err); });
};
exports.register = register;
var getAll = function (req, res, next) {
    userService.getAll()
        .then(function (users) { return res.json(users); })
        .catch(function (err) { return next(err); });
};
exports.getAll = getAll;
var getCurrent = function (req, res, next) {
    var _a;
    userService.getById((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub)
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        .then(function (user) {
        if (user) {
            var filteredUser = __assign({}, user);
            filteredUser === null || filteredUser === void 0 ? true : delete filteredUser.password;
            res.json(filteredUser);
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(function (err) { return next(err); });
};
exports.getCurrent = getCurrent;
var getById = function (req, res, next) {
    userService.getById(req.params.id)
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        // .then(user => {user ? res.json(user) : res.sendStatus(404)})
        .then(function (user) {
        if (user) {
            var filteredUser = Object.assign({}, user);
            filteredUser === null || filteredUser === void 0 ? true : delete filteredUser.password;
            res.json(filteredUser);
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(function (err) { return next(err); });
};
exports.getById = getById;
var updateUser = function (req, res, next) {
    if (req.params.id !== req.user.sub)
        throw 'Not allowed';
    userService.update(req.params.id, req.body)
        .then(function (user) {
        var _a;
        if (user) {
            var filteredUser = (_a = Object.assign({}, user)) === null || _a === void 0 ? void 0 : _a._doc;
            filteredUser === null || filteredUser === void 0 ? true : delete filteredUser.password;
            res.json(filteredUser);
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(function (err) { return next(err); });
};
exports.updateUser = updateUser;
var updateProfile = function (req, res, next) {
    if (req.params.id !== req.user.sub)
        throw 'Not allowed';
    userService.updateProfile(req.params.id, req.body)
        .then(function (user) {
        var _a;
        if (user) {
            var filteredUser = (_a = Object.assign({}, user)) === null || _a === void 0 ? void 0 : _a._doc;
            filteredUser === null || filteredUser === void 0 ? true : delete filteredUser.password;
            res.json(filteredUser);
        }
        else {
            res.sendStatus(404);
        }
    })
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(function (err) { return next(err); });
};
exports.updateProfile = updateProfile;
var updateImage = function (req, res, next) {
    var _a;
    if (req.params.id !== req.user.sub)
        throw 'Not allowed';
    var dir = path_1.default.join(__dirname);
    var imgURL = 'http://localhost:5000/' + ((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename);
    userService.updateImage(req.params.id, imgURL)
        .then(function (user) {
        var _a;
        if (user) {
            var filteredUser = (_a = Object.assign({}, user)) === null || _a === void 0 ? void 0 : _a._doc;
            filteredUser === null || filteredUser === void 0 ? true : delete filteredUser.password;
            res.json(filteredUser);
        }
        else {
            res.sendStatus(404);
        }
    })
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        // .then(() => res.json({}))
        .catch(function (err) { return next(err); });
    // })
};
exports.updateImage = updateImage;
var remove = function (req, res, next) {
    if (req.params.id !== req.user.sub)
        throw 'Not allowed';
    userService.remove(req.params.id)
        .then(function () { return res.json({}); })
        .catch(function (err) { return next(err); });
};
exports.remove = remove;
var findNearBy = function (req, res, next) {
    userService.findNearBy(req.params.id)
        .then(function (user) { return res.json({ user: user }); })
        .catch(function (err) { return next(err); });
};
exports.findNearBy = findNearBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVycy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBbUQ7QUFFbkQsOENBQXVCO0FBRXZCLHdCQUF3QjtBQUV4QixJQUFNLFlBQVksR0FBRyxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDakUsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQzlCLGdIQUFnSDtTQUMvRyxJQUFJLENBQUMsVUFBQSxJQUFJO1FBQ04sSUFBRyxJQUFJLEVBQUU7WUFDVCxJQUFNLFlBQVksR0FBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN0QyxZQUFZLGFBQVosWUFBWSw0QkFBWixZQUFZLENBQUUsUUFBUSxDQUFBO1lBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDdEI7YUFDSztZQUNELEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDbkI7SUFDTCxDQUFDLENBQUM7U0FDTCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFBO0FBbUhHLG9DQUFZO0FBakhoQixJQUFNLFFBQVEsR0FBRyxVQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDN0QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3ZCLElBQUksQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXhCLENBQXdCLENBQUM7U0FDcEMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9B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