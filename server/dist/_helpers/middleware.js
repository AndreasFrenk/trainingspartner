"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var dir = path_1.default.join(__dirname + '/../../public');
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIl9oZWxwZXJzL21pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMkI7QUFDM0IsOENBQXVCO0FBRXZCLElBQU0sR0FBRyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxDQUFDO0FBRW5ELElBQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBRUgsSUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFNUMsa0JBQWUsTUFBTSxDQUFBIn0=