import express from "express";
import Provider from "../models/Provider.js";
import Visitor from "../models/Visitor.js";

const router = express.Router();

// Get all providers
router.get("/providers", async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch providers" });
  }
});

// Delete provider
router.delete("/provider/:id", async (req, res) => {
  try {
    await Provider.findByIdAndDelete(req.params.id);
    res.json({ message: "Provider deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete provider" });
  }
});

// Edit provider
router.put("/provider/:id", async (req, res) => {
  try {
    const updated = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update provider" });
  }
});

// System-wide statistics
router.get("/stats", async (req, res) => {
  try {
    const providerCount = await Provider.countDocuments();
    const visitorCount = await Visitor.countDocuments();
    
    res.json({
      providerCount,
      visitorCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export default router;
