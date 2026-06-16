import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();
router.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static frontend files
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'image')));


let storedRegistration = {}; 


// Test route
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// Import models at the top (NEVER dynamically)
import Service from "./backend/models/Service.js";
import Visitor from "./backend/models/Visitor.js";
import Provider from "./backend/models/Provider.js";



//Complaint section
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,     // your gmail
        pass: process.env.GMAIL_PASS      // app password, not your real password
    }
});

app.get("/api/stats", async (req, res) => {
  try {
    const serviceCount  = await Service.countDocuments({ owner: { $exists: true, $ne: null } });
    const visitorCount  = await Visitor.countDocuments({ qualifies: true }); // spent 15+ seconds
    res.json({ serviceCount, visitorCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track visitor
app.post("/api/visitors/track", async (req, res) => {
  try {
    const { sessionId, timeSpent } = req.body;

    if (!sessionId) return res.status(400).json({ error: 'No sessionId' });

    const qualifies = timeSpent >= 15;

    await Visitor.findOneAndUpdate(
      { sessionId },
      { $set: { sessionId, timeSpent, qualifies, updatedAt: new Date() } }, 
      { upsert: true, new: true }
    );

    res.json({ success: true, qualifies });

  } catch (err) {
    console.error('❌ Visitor track error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, category, location, contact, description, priceRange, socialMedia } = req.body;
    if (!name || !category || !location?.district || !contact?.phone) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Not authenticated" });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newService = new Service({
      name,
      description:  description || "",
      category:     [category],
      location:     { district: location.district, area: location.area || "" },
      contact:      { phone: contact.phone },
      priceRange:   priceRange || "",
      socialMedia:  socialMedia || [],
      owner:        decoded.userId, 
      rating: {average: 0, count:   0},
      createdAt:    new Date()
    });

    await newService.save();

    await Provider.findByIdAndUpdate(decoded.userId, {
      $push: { services: newService._id }
    });

    res.status(201).json({ message: "Registered successfully!", id: newService._id });

  } catch (err) {
    console.error("❌ Full error:", err); 
    res.status(500).json({ error: err.message }); 
  }
});

app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,       // sends to yourself
            replyTo: email,                   // reply goes to the user
            subject: `[${subject}] from ${name}`,
            text: `Name:    ${name}
                  Email:   ${email}
                  Phone:   ${phone || "Not provided"}
                  Subject: ${subject}

            ${message}
                      `
                  });

                  res.json({ success: true });
              } catch (err) {
                  console.error("Email error:", err);
                  res.status(500).json({ error: "Failed to send email" });
              }
            });

            

// MongoDB connection
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(async () => {
    console.log("✅ MongoDB connected successfully");
    console.log("📂 Database:", mongoose.connection.db.databaseName);

    // TEST QUERY
    try {
      const count = await Service.countDocuments();
      const sample = await Service.findOne();
      console.log(`📊 Found ${count} services in DB`);
      console.log(`📝 Sample service:`, sample?.name);
    } catch (err) {
      console.error("❌ Direct query failed:", err);
    }

    // ROUTES
    const serviceRoutes = (await import("./backend/routes/services.js")).default;
    const visitorRoutes = (await import("./backend/routes/visitors.js")).default;
    const providerRoutes = (await import("./backend/routes/providers.js")).default;
    const adminRoutes = (await import("./backend/routes/admin.js")).default;
    const authRoutes = (await import("./backend/routes/auth.js")).default;

    app.use("/api/providers", providerRoutes);
    app.use("/api/services", serviceRoutes);
    app.use("/api/visitors", visitorRoutes);
    app.use("/api/admin", adminRoutes);
    app.use('/api/auth', authRoutes);

    // Get saved data
    app.get("/service-details", (req, res) => {
        res.json(storedRegistration);
    });

    app.get('/{*path}', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });


    // START SERVER
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
