import express from "express"; 
import mongoose from "mongoose"; 
import Visitor from "../models/Visitor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  router.set("trust proxy", true);
  try {
    const rawIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress;

    const ip = req.ip;

    if (!ip) {
      return res.status(400).json({
        error: "Unable to determine visitor IP"
      });
    }

    await Visitor.findOneAndUpdate(
      { ip },
      {
        $setOnInsert: {
          ip,
          createdAt: new Date()
        }
      },
      {
        upsert: true,
        returnDocument: "after"
      }
    );

    const count = await Visitor.countDocuments();

    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to count visitors"
    });
  }
});
export default router;

