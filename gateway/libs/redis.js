const {createClient} = require('redis');


const redis = createClient().on('error', (error) => {
    console.log('redis error: ',error);
});

(async () => {
    await redis.connect()
})();

module.exports = redis