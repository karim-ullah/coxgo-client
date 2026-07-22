import { MongoClient } from "mongodb";

let clientPromise;

export function getMongoClient() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGO_URI);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getAppDb() {
  const client = await getMongoClient();
  return client.db(process.env.MONGO_DB_NAME || "coxGo");
}
