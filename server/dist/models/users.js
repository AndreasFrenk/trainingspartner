"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    profileImage: { type: String },
    edited: { type: Boolean, default: false },
    profile: {
        sports: { type: [String] },
        age: { type: Number },
        location: {
            city: { type: String },
            country: { type: String },
            loc: {
                type: {
                    type: String,
                    enum: ['Point']
                },
                coordinates: {
                    type: [Number]
                }
            }
        }
    }
});
userSchema.index({ "profile.location.loc": '2dsphere' });
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvdXNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNEM7QUF3QjVDLElBQU0sVUFBVSxHQUFXLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDN0MsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDeEQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDckQsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUU7SUFDOUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUM5QixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUM7SUFDdkMsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7UUFDeEIsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztRQUNuQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO1lBQ3BCLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7WUFDdkIsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQ2hCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ2Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUMsc0JBQXNCLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQTtBQUV0RCxJQUFNLElBQUksR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBUSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFdkQsa0JBQWUsSUFBSSxDQUFDIn0=