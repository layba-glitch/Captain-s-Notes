// index.js
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

// MongoDB connection
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        console.log("🚀 Connecting to MongoDB...");
        await client.connect();
        console.log("✅ MongoDB Connected!");

        const db = client.db("notesDB");
        const notes = db.collection("notes");

        // Create Note
        app.post('/notes', async (req, res) => {
            try {
                const result = await notes.insertOne(req.body);
                res.send(result);
            } catch (err) {
                console.error("❌ Error inserting note:", err);
                res.status(500).send("Error inserting note");
            }
        });

        // Get All Notes
        app.get('/notes', async (req, res) => {
            try {
                const result = await notes.find({}).toArray();
                res.send(result);
            } catch (err) {
                console.error("❌ Error fetching notes:", err);
                res.status(500).send("Error fetching notes");
            }
        });

        // Update Note
        app.put('/notes/:id', async (req, res) => {
            try {
                const result = await notes.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: req.body }
                );
                res.send(result);
            } catch (err) {
                console.error("❌ Error updating note:", err);
                res.status(500).send("Error updating note");
            }
        });

        // Delete Note
        app.delete('/notes/:id', async (req, res) => {
            try {
                const result = await notes.deleteOne({ _id: new ObjectId(req.params.id) });
                res.send(result);
            } catch (err) {
                console.error("❌ Error deleting note:", err);
                res.status(500).send("Error deleting note");
            }
        });

        // Bulk insert notes
app.post('/notes/bulk', async (req, res) => {
  try {
    const result = await notes.insertMany(req.body);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting bulk notes");
  }
});

        // Start server
        const PORT = 5000;
        app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
    }
}

run();
