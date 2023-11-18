const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'https://906d39f3126d433cb8e2e7df047ccb1d.us-central1.gcp.cloud.es.io:443',
  auth: {
      apiKey: 'STQ2eDRZc0JnbTdSWnI0R1hMNzY6N0g3UjJ5OWVUXzJac3NlQ3pKX1Bsdw=='
  }
});
console.log("i start");
// API Key should have cluster monitor rights.
async function letsgo(){
    const resp = await client.info();

    console.log(resp);
    const result = await client.helpers.bulk({
        datasource: dataset,
        pipeline: "ent-search-generic-ingestion",
        onDocument: (doc) => ({ index: { _index: 'search-logs' }}),
      });
      
      console.log(result);
}
letsgo();
// Sample data books
const dataset = [
    {"name": "Snow Crash", "author": "Neal Stephenson", "release_date": "1992-06-01", "page_count": 470, "_extract_binary_content": true, "_reduce_whitespace": true, "_run_ml_inference": false},
    {"name": "Revelation Space", "author": "Alastair Reynolds", "release_date": "2000-03-15", "page_count": 585, "_extract_binary_content": true, "_reduce_whitespace": true, "_run_ml_inference": false},
    {"name": "1984", "author": "George Orwell", "release_date": "1985-06-01", "page_count": 328, "_extract_binary_content": true, "_reduce_whitespace": true, "_run_ml_inference": false},
    {"name": "Fahrenheit 451", "author": "Ray Bradbury", "release_date": "1953-10-15", "page_count": 227, "_extract_binary_content": true, "_reduce_whitespace": true, "_run_ml_inference": false},
    {"name": "Brave New World", "author": "Aldous Huxley", "release_date": "1932-06-01", "page_count": 268, "_extract_binary_content": true, "_reduce_whitespace": true, "_run_ml_inference": false},
    {"name": "The Handmaid's Tale", "author": "Margaret Atwood", "release_date": "1985-06-01", "page_count": 311, "_extract_binary_content": true, "_reduce_whitespace": true, "_run_ml_inference": false},
  ];
  
  // Index with the bulk helper
 
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

/**
{
  name: 'instance-0000000000',
  cluster_name: 'd9dcd35d12fe46dfaa28ec813f65d57b',
  cluster_uuid: 'iln8jaivThSezhTkzp0Knw',
  version: {
    build_flavor: 'default',
    build_type: 'docker',
    build_hash: 'ca3dc3a882d76f14d2765906ce3b1cf421948d19',
    build_date: '2023-08-28T11:24:16.383660553Z',
    build_snapshot: true,
    lucene_version: '9.7.0',
    minimum_wire_compatibility_version: '7.17.0',
    minimum_index_compatibility_version: '7.0.0'
  },
  tagline: 'You Know, for Search'
}
*/