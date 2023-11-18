const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("@elastic/elasticsearch");

const app = express();
const PORT = process.env.PORT || 3000;

// Elasticsearch client
const elasticClient = new Client({
  node: "https://906d39f3126d433cb8e2e7df047ccb1d.us-central1.gcp.cloud.es.io:443",
  CloudID:
    "my_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDkwNmQzOWYzMTI2ZDQzM2NiOGUyZTdkZjA0N2NjYjFkJDBkOWZkMGY5NjQ0NzQwZjliY2NlM2M3Yjk5OWI5NjFl",
  auth: {
    apiKey: "STQ2eDRZc0JnbTdSWnI0R1hMNzY6N0g3UjJ5OWVUXzJac3NlQ3pKX1Bsdw==",
  },
  auth: {
    username: "elastic",
    password: "MY2pBcyvPu2QthdMxagZyHyW",
  },
});

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route to handle log ingestion via POST requests
app.post("/ingest", async (req, res) => {
  const logData = req.body;
  console.log("Received log data:", logData);

  try {
    // Index the log data into Elasticsearch
    const result = await elasticClient.helpers.bulk({
        datasource: logData,
        pipeline: "ent-search-generic-ingestion",
        onDocument: (doc) => ({ index: { _index: "search-logs" } }),
      });
  
      console.log("Bulk Indexing Result:", result);
    // if (body.result === 'created') {
    //     console.log('Log data indexed successfully');
    // } else {
    //     console.error('Failed to index log data:', body);
    // }

    console.log("Log data indexed:", result);
    res.status(200).send("Log data received and indexed successfully.");
  } catch (error) {
    console.error("Error:", error.meta ? error.meta.body : error);
//     console.error("Error indexing log data:", error);
//     res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// https://my-deployment-3bc346.kb.us-central1.gcp.cloud.es.io:9243
