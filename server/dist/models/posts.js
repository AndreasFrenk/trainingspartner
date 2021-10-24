"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: function () { return new Date(); } },
    text: { type: String, required: true },
    likes: { type: [mongoose_1.default.Schema.Types.ObjectId] },
    comments: { type: [{
                username: { type: String },
                user: { type: mongoose_1.default.Schema.Types.ObjectId },
                text: { type: String }
            }] }
});
var Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvcG9zdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxzREFBNEM7QUFlNUMsSUFBTSxVQUFVLEdBQVcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFDO0lBQ3pELFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLGNBQU0sT0FBQSxJQUFJLElBQUksRUFBRSxFQUFWLENBQVUsRUFBQztJQUNqRCxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7SUFDcEMsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDO0lBQy9DLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO2dCQUN4QixJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsa0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQztnQkFDNUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQzthQUNyQixDQUFDLEVBQUM7Q0FDTixDQUFDLENBQUM7QUFHSCxJQUFNLElBQUksR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBUyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFeEQsa0JBQWUsSUFBSSxDQUFDIn0=