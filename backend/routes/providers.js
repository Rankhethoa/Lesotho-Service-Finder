import express from "express"; 
import mongoose from "mongoose"; 
import Provider from "../models/Provider.js";

const router = express.Router();

// Update provider profile
router.put("/update/:id", async (req, res) => {
    try {
      const updated = await Provider.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // return updated data
      );
  
      if (!updated) {
        return res.status(404).json({ error: "Provider not found" });
      }
  
      res.json({ message: "Profile updated successfully", updated });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: "Failed to update provider" });
    }
  });

  export default router;