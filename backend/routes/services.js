import express from "express"; 
import mongoose from "mongoose"; 
import Service from "../models/Service.js";
import Provider from "../models/Provider.js";
import authenticate from "../../middleware/authenticate.js"; 


const router = express.Router();

router.get("/ping", (req, res) => { 
  res.json({ message: "Route is working!", 
    dbState: mongoose.connection.readyState 
  }); 
});


router.get("/", async (req, res) => { 
  try{ 
    console.log("📌 Incoming GET /services request"); 
    const { keyword, category, location, page=1, limit=5 } = req.query; 
    const query = {}; 

    //if (keyword && keyword.trim()) query.name = { $regex: keyword, $options: "i" };
    if (keyword && keyword.trim()) {
      const terms = keyword.trim().split(/\s+/);
      query.$and = terms.map(term => ({
          $or: [
              { name: { $regex: term, $options: "i" } },
              { category: { $regex: term, $options: "i" } },
              { description: { $regex: term, $options: "i" } },
              { "location.district": { $regex: term, $options: "i" } },
              { "location.area": { $regex: term, $options: "i" } },
          ]
      }));
    }
    if (category && category.trim()) query.category = category;
    if (location && location.trim()) query["location.district"] = location;
    
    const skip = (page-1) * limit; 
    const [services, total] = await Promise.all([ 
      Service.find(query).skip(skip).limit(Number(limit)), 
      Service.countDocuments(query), 
    ]); 
    console.log(`Found ${services.length} services`);
    res.json({ 
      services, total, totalPages: Math.ceil(total/limit), currentPage: Number(page), }); 
    } 
    catch (err){ 
      console.error ("Error fetching services:" , err); 
      res.status(500).json({error: "Server error"}); 
    } 
  });

  // This part is for service-details
  router.get("/service", async (req, res) => {
    const serviceId = req.query.id;
  
    if (!serviceId) {
      return res.status(400).json({ error: "missing service id" });
    }
  
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ error: "invalid service id" });
    }
  
    try {
      const service = await Service.findById(serviceId);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (err) {
      console.error("Error fetching service by id:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  //for number of service providers
  router.get("/count", async (req, res) => {
    try {
      const count = await Service.countDocuments();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: "Failed to count services" });
    }
  });

//for service-provider
router.get("/service", async (req, res) => {
  const serviceId = req.query.id;

  if (!serviceId) {
    return res.status(400).json({ error: "missing service id" });
  }

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ error: "invalid service id" });
  }

  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    console.error("Error fetching service by id:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// Get top service providers by views
router.get("/top-providers", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const topProviders = await Service.find()
      .sort({ views: -1 }) // Sort by views first, then rating //      .sort({ views: -1, rating: -1 }) // Sort by views first, then rating
      .limit(limit);
    
    res.json(topProviders);
  } catch (err) {
    console.error("Error fetching top providers:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Increment view count when service is viewed
router.post("/increment-view/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    
    res.json({ views: service.views });
  } catch (err) {
    console.error("Error incrementing views:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new service
router.post("/", async (req, res) => {
  //const { name, category, location, description, contact } = req.body;
  try {
    //const newService = new Service({ name, category, location, description, contact });
    console.log("📌 Incoming POST /services request");
    console.log("Body:", req.body);

    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: "Failed to add service" });
  }
});


// Register a service — protected route
router.post('/register', authenticate, async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      owner: req.user.userId  // link to logged-in user
    });

    // Add service ref to user's services array
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { services: service._id }
    });

    res.status(201).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services for the logged-in user
router.get('/mine', authenticate, async (req, res) => {
  try {
    const services = await Service.find({ owner: req.user.userId });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a service — protected
router.put('/:id', authenticate, async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId }, // ensures they own it
      { $set: req.body },
      { new: true }
    );

    if (!service) return res.status(404).json({ error: 'Service not found' });

    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/services/:id/rate
router.post('/:id/rate', async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    // ✅ Recalculate average
    const currentCount   = service.rating?.count   || 0;
    const currentAverage = service.rating?.average || 0;
    const currentTotal   = currentAverage * currentCount;

    const newCount   = currentCount + 1;
    const newAverage = (currentTotal + rating) / newCount;

    /*service.rating = {
      average: Math.round(newAverage * 10) / 10, // round to 1 decimal
      count:   newCount
    };*/

    //await service.save();
    const newAverageDouble = parseFloat(newAverage.toFixed(1));
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          'rating.average': newAverageDouble, //Math.round(newAverage * 10) / 10,
          'rating.count':   newCount
        }
      },
      { new: true ,
        bypassDocumentValidation: true 
      } // return updated document
      
    );

    console.log('Rating updated:', updated.rating);
    res.json({ success: true, rating: updated.rating });

    res.json({ success: true, rating: service.rating });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

