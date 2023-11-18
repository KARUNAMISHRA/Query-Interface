import { Client } from '@elastic/elasticsearch';

// Elasticsearch client configuration for Elastic Cloud
const elasticClient = new Client({
    cloud: {
        id: 'my_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDkwNmQzOWYzMTI2ZDQzM2NiOGUyZTdkZjA0N2NjYjFkJDBkOWZkMGY5NjQ0NzQwZjliY2NlM2M3Yjk5OWI5NjFl',
    },
    auth: {
        username: 'elastic',
        password: 'MY2pBcyvPu2QthdMxagZyHyW',
    },
});

async function fetchData() {
    try {
        // Retrieve logs from Elasticsearch in Elastic Cloud
        const { body } = await elasticClient.search({
            index: 'logs', // Replace with your index name
            body: {
                query: {
                    match_all: {},
                },
            },
        });
        console.log(body);
        // Check if the 'hits' property exists in the response body
        if (body && body.hits && body.hits.hits) {
            const logs = body.hits.hits.map(hit => hit._source);
            console.log('Retrieved logs:', logs);
        } else {
            console.error('Unexpected response format:', body);
        }
    } catch (error) {
        console.error('Error retrieving logs:', error);
    }
}

// Run the fetchData function
fetchData();
