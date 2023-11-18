const { Client } = require("@elastic/elasticsearch");

const client = new Client({
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

console.log("Code execution started");

async function letsgo() {
  try {
    // Check the cluster information
    const clusterInfo = await client.info();
    console.log("Cluster Information:", clusterInfo);

    // Perform bulk indexing of documents
    const result = await client.helpers.bulk({
      datasource: dataset,
      pipeline: "ent-search-generic-ingestion",
      onDocument: (doc) => ({ index: { _index: "search-logs" } }),
    });

    console.log("Bulk Indexing Result:", result);
  } catch (error) {
    console.error("Error:", error.meta ? error.meta.body : error);
  }
}

// Sample data for bulk indexing
const dataset = [
  {
    name: "Snow Crash",
    author: "Neal Stephenson",
    release_date: "1992-06-01",
    page_count: 470,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
  // Add more documents as needed
];

// Call the letsgo function to execute the code
letsgo();

// Sample data books
const dataset2 = [
  {
    name: "Snow Crash",
    author: "Neal Stephenson",
    release_date: "1992-06-01",
    page_count: 470,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
  {
    name: "Revelation Space",
    author: "Alastair Reynolds",
    release_date: "2000-03-15",
    page_count: 585,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
  {
    name: "1984",
    author: "George Orwell",
    release_date: "1985-06-01",
    page_count: 328,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
  {
    name: "Fahrenheit 451",
    author: "Ray Bradbury",
    release_date: "1953-10-15",
    page_count: 227,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
  {
    name: "Brave New World",
    author: "Aldous Huxley",
    release_date: "1932-06-01",
    page_count: 268,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
  {
    name: "The Handmaid's Tale",
    author: "Margaret Atwood",
    release_date: "1985-06-01",
    page_count: 311,
    _extract_binary_content: true,
    _reduce_whitespace: true,
    _run_ml_inference: false,
  },
];

async function help() {
  // Index with the bulk helper
  const result = await client.helpers.bulk({
    datasource: dataset2,
    pipeline: "ent-search-generic-ingestion",
    onDocument: (doc) => ({ index: { _index: "search-logs" } }),
  });

  console.log(result);

  const searchResult = await client.search({
    index: "search-logs",
    q: "snow",
  });

  console.log(searchResult.hits.hits);
}

// help();

// Let's search!

/**
  {
    total: 6,
    failed: 0,
    retry: 0,
    successful: 6,
    noop: 0,
    time: 82,
    bytes: 1273,
    aborted: false
  }
  */
