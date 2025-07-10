// controllers/statsController.js
import Car from "../models/car.js";

export const getCarStats = async (req, res, next) => {
  try {
    const cars = await Car.find();

    const typeCounts = {};
    const monthlyCounts = {};

    cars.forEach((car) => {
      // Tipuri
      typeCounts[car.type] = (typeCounts[car.type] || 0) + 1;

      // Luna
      const month = new Date(car.createdAt).toLocaleString("default", {
        month: "short",
      }); // "Jan", "Feb", etc.
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    res.status(200).json({
      types: typeCounts,
      months: monthlyCounts,
    });
  } catch (err) {
    console.error("Eroare la stats:", err);
    res.status(500).json({ message: "Eroare la statistici" });
  }
};


import User from "../models/user.js"; // asigură-te că path-ul e corect

export const getUserStats = async (req, res) => {
  try {
    const users = await User.find();

    const monthlyData = Array(12).fill(0); // index = luna (0 = Ian, ..., 11 = Dec)
    const roleDistribution = { client: 0, admin: 0 };

    users.forEach((user) => {
      const createdMonth = new Date(user.createdAt).getMonth();
      monthlyData[createdMonth]++;

      if (roleDistribution[user.role] !== undefined) {
        roleDistribution[user.role]++;
      }
    });

    const labels = [
      "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
      "Iul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    res.status(200).json({
      labels,
      monthlyNewUsers: monthlyData,
      roleDistribution,
    });
  } catch (err) {
    console.error("Eroare la statistici utilizatori:", err);
    res.status(500).json({ message: "Eroare la statistici utilizatori" });
  }
};
