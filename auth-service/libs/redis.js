const {createClient} = require('redis');


const redis1 = createClient().on('error', (error) => {
    console.log('redis error: ',error);
});
const redis2 = createClient().on('error', (error) => {
    console.log('redis error: ',error);
});

(async () => {
    await redis1.connect()
    await redis2.connect()
})();

module.exports = {redis1,redis2}