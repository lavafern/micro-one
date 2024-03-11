const db = require('./index');

(async ()=> {
    try {
        
        await db.sequilize.sync({ force: true })
        console.log('database synced');
        process.exit()

    } catch (error) {
            console.log('err:',err);
    }

})();

