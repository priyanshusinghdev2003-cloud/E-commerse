import mongoose from "mongoose";

const SellerApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SellerApplication ||
  mongoose.model("SellerApplication", SellerApplicationSchema);
