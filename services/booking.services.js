import Booking from "../models/booking.models.js";

export const createBooking = async (data) => {
  const booking = new Booking(data);
  return await booking.save();
};

export const findBookingById = async (id) => {
  return await Booking.findById(id).populate("userId photographerId");
};

export const findBookingsByUserId = async (userId) => {
  return await Booking.find({ userId }).populate("photographerId");
};

export const findBookingsByPhotographerId = async (photographerId) => {
  return await Booking.find({ photographerId }).populate("userId");
};

export const updateBookingStatus = async (id, status) => {
  return await Booking.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
};

export const deleteBooking = async (id) => {
  return await Booking.findByIdAndDelete(id);
};

export const getAllBookings = async () => {
  return await Booking.find().populate("userId photographerId");
};
