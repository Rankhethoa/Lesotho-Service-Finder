import express from "express"; 
import mongoose from "mongoose"; 
import Visitor from "../models/Visitor.js";

const router = express.Router();

/*
router.get("/", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    // Check if this IP already exists in DB
    const existing = await Visitor.findOne({ ip });

    if (!existing) {
      await Visitor.create({ ip }); // Save new visitor IP
    }

    const count = await Visitor.countDocuments(); // Count unique visitors

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count visitors" });
  }
}); */

router.get("/", async (req, res) => {
  try {
    const rawIp =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket.remoteAddress;
    const ip = rawIp?.replace("::ffff:", "");
    console.log("Visitor IP:", ip);

    await Visitor.findOneAndUpdate(
      { ip },
      { $setOnInsert: { ip, createdAt: new Date() } },
      { upsert: true, new: true }
      
    );

    const count = await Visitor.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to count visitors" });
  }
});
export default router;

