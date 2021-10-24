"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_js_1 = require("../controllers/users.js");
var middleware_1 = __importDefault(require("../_helpers/middleware"));
var router = express_1.default.Router();
// routes
router.post('/authenticate', users_js_1.authenticate);
router.post('/register', users_js_1.register);
router.get('/', users_js_1.getAll);
router.get('/current', users_js_1.getCurrent);
router.get('/:id', users_js_1.getById);
router.post('/profileImage/:id', middleware_1.default.single('file'), users_js_1.updateImage);
router.post('/updateProfile/:id', users_js_1.updateProfile);
router.post('/updateUser/:id', users_js_1.updateUser);
router.get('/findNearBy/:id', users_js_1.findNearBy);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJyb3V0ZXMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNkI7QUFDN0Isb0RBQWdKO0FBQ2hKLHNFQUEyQztBQUUzQyxJQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBSS9CLFNBQVM7QUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSx1QkFBWSxDQUFDLENBQUM7QUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsbUJBQVEsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGlCQUFNLENBQUMsQ0FBQztBQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxxQkFBVSxDQUFDLENBQUM7QUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsa0JBQU8sQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsb0JBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsc0JBQVcsQ0FBQyxDQUFDO0FBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUMsd0JBQWEsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUMscUJBQVUsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUMscUJBQVUsQ0FBQyxDQUFDO0FBSXpDLGtCQUFlLE1BQU0sQ0FBQSJ9