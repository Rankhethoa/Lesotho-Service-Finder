import mongoose from "mongoose";
const uri =process.env.MONGO_URI || "mongodb://127.0.0.1:27017/serviceFinder";

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  mongoose.connection.once('open', async () => {
    const db = mongoose.connection.db;
    
    const result = await db.command({
      update: "services",
      updates: [{
        q: {},
        u: { $set: { "rating.average": 0, "rating.count": 0 } },
        multi: true
      }],
      bypassDocumentValidation: true
    });
  
    console.log('Done:', result);
    mongoose.disconnect();
  });
