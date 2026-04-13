import { createBooking, findBookingById, findBookingsByUserId, findBookingsByPhotographerId, updateBookingStatus, deleteBooking, getAllBookings } from "../services/booking.services.js";
import { bookingValidation } from "../schemas/booking.schema.js";
import User from "../models/user.models.js";
import Photographer from "../models/photographers.models.js";

export const createBookingController = async (req, res) => {
  try {
    const { error, value } = bookingValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // 1. Check if user exists
    const userExist = await User.findById(value.userId);
    if (!userExist) return res.status(404).json({ message: "User not found" });

    // 2. Check if photographer exists
    const photographerExist = await Photographer.findById(value.photographerId);
    if (!photographerExist) return res.status(404).json({ message: "Photographer not found" });

    const newBooking = await createBooking(value);

    // Instant Date Blocking: Add to unavailable_dates on creation
    const dateStr = value.bookingDate instanceof Date 
        ? value.bookingDate.toISOString().split('T')[0]
        : new Date(value.bookingDate).toISOString().split('T')[0];
        
    await Photographer.findByIdAndUpdate(value.photographerId, {
      $addToSet: { unavailable_dates: dateStr }
    });

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingByIdController = async (req, res) => {
  try {
    const booking = await findBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingsByUserController = async (req, res) => {
  try {
    const bookings = await findBookingsByUserId(req.params.userId);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingsByPhotographerController = async (req, res) => {
  try {
    const bookings = await findBookingsByPhotographerId(req.params.photographerId);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBookingStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await updateBookingStatus(req.params.id, status);

    // Dynamic Availability: Block/Unblock dates in photographer's calendar
    if (["accepted", "rejected", "cancelled"].includes(status)) {
      const booking = await findBookingById(req.params.id);
      if (booking && booking.photographerId && booking.bookingDate) {
        const dateStr = booking.bookingDate instanceof Date 
            ? booking.bookingDate.toISOString().split('T')[0]
            : new Date(booking.bookingDate).toISOString().split('T')[0];
            
        if (status === "accepted") {
          await Photographer.findByIdAndUpdate(booking.photographerId, {
            $addToSet: { unavailable_dates: dateStr }
          });
        } else if (status === "rejected" || status === "cancelled") {
          await Photographer.findByIdAndUpdate(booking.photographerId, {
            $pull: { unavailable_dates: dateStr }
          });
        }
      }
    }

    res.status(200).json({ message: "Booking status updated", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBookingController = async (req, res) => {
  try {
    await deleteBooking(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
