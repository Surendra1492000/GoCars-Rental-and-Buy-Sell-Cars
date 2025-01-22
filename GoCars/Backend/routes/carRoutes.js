const express = require("express");
const { addCar, getCars, updateCar, deleteCar } = require("../controllers/carController");
const { protect, isAdmin } = require("../config/authMiddleware");
const router = express.Router();

router.post("/", protect, isAdmin, addCar);
router.get("/", getCars);
router.put("/:id", protect, isAdmin, updateCar);
router.delete("/:id", protect, isAdmin, deleteCar);

module.exports = router;
