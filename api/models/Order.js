import mongoose from "mongoose";
const RoomNumberSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  roomNumbers: {
    type: [RoomNumberSchema],
    required: true,
  },
  dates: {
    type: [Date],
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Order", OrderSchema);
