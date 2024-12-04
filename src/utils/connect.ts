import mongoose from "mongoose";

async function connect() {
  const dbUri = process.env.DB_URI || "mongodb://localhost:27017";
  const collectionName = process.env.DB_COLLECTION || "sawti-db";

  try {
    await mongoose.connect(dbUri);
    console.info("DB connected");

    const db = mongoose.connection;
    const myCollection = db.collection(collectionName);

    const data = await myCollection.find().toArray();
    console.log(data);
  } catch (error) {
    console.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
