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
exports.jwt = void 0;
var express_jwt_1 = __importDefault(require("express-jwt"));
var users_js_1 = require("../services/users.js");
function jwt() {
    var secret = process.env.SECRET;
    return (0, express_jwt_1.default)({ secret: secret, algorithms: ['HS256'], isRevoked: isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
        ]
    });
}
exports.jwt = jwt;
function isRevoked(req, payload, done) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, users_js_1.getById)(payload.sub)];
                case 1:
                    user = _a.sent();
                    // revoke token if user no longer exists
                    if (!user) {
                        return [2 /*return*/, done(null, true)];
                    }
                    done();
                    return [2 /*return*/];
            }
        });
    });
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiX2hlbHBlcnMvand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDREQUFvQztBQUNwQyxpREFBNEM7QUFLNUMsU0FBZ0IsR0FBRztJQUNmLElBQU0sTUFBTSxHQUEwQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQztJQUMxRCxPQUFPLElBQUEscUJBQVUsRUFBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsV0FBQSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkUsSUFBSSxFQUFFO1lBQ0Ysa0RBQWtEO1lBQ2xELHFCQUFxQjtZQUNyQixpQkFBaUI7U0FDcEI7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBVEQsa0JBU0M7QUFDRCxTQUFlLFNBQVMsQ0FBQyxHQUFRLEVBQUUsT0FBWSxFQUFFLElBQVM7Ozs7O3dCQUN6QyxxQkFBTSxJQUFBLGtCQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFBOztvQkFBakMsSUFBSSxHQUFHLFNBQTBCO29CQUV2Qyx3Q0FBd0M7b0JBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ1Asc0JBQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQztxQkFDM0I7b0JBRUQsSUFBSSxFQUFFLENBQUM7Ozs7O0NBQ1Y7QUFBQSxDQUFDIn0=