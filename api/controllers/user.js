import User from "../models/User.js";
import Order from "../models/Order.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const createOrder = async (req,res,next)=>{
  try {
    const { user, hotel, roomNumbers, dates, totalPrice } = req.body;
    const newOrder = new Order({
      user,
      hotel,
      roomNumbers,
      dates,
      totalPrice,
    });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
}
export const getUserOrder = async (req,res,next)=>{
  const _id = req.params.id;
  try {
    const orders = await Order.find({ user: _id }).populate("hotel"); // Find orders with matching user ID
    res.json(orders);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const deleteUserOrder = async (req,res,next)=>{
  const orderId = req.params.orderId;

  try {
    // Tìm order dựa trên orderId và xóa nó
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}