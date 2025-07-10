import Car from "../models/car.js";
import createError from "../utils/createError.js";

export const getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    next(createError("Error fetching cars", 500));
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return next(createError("Car not found", 404));
    }
    res.status(200).json(car);
  } catch (error) {
    next(createError("Error fetching car by ID", 500));
  }
};

export const createCar = async (req, res, next) => {
  const { body } = req;
  try {
    if (!body) {
      return next(createError("Invalid request body", 400));
    }
    const newCar = new Car(body);
    console.log(newCar);
    if (!newCar) {
      return next(createError("Invalid data for a car", 400));
    }
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
  console.error("CREATE CAR ERROR:", error.message);
  next(createError("Error creating car", 500));
}
};
export const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCar) {
      return next(createError("Car not found", 404));
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    next(createError("Error updating car", 500));
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return next(createError("Car not found", 404));
    }
    res.status(200).json({ message: "Car deleted successfully" }); // 🔧 aici e schimbarea
  } catch (error) {
    next(createError("Error deleting car", 500));
  }
};


export const addReviewToCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const car = await Car.findById(id);
    if (!car) return next(createError("Car not found", 404));

    car.reviews.push({ rating, comment });
    await car.save();

    res.status(201).json(car);
  } catch (error) {
    next(createError("Error adding review", 500));
  }
};

