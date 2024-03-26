module.exports = (req,res,next) => {
    try {
        console.log('Hit ',req.originalUrl)
        next()
    } catch (err) {
        console.log(err);
        next(err)
    }
}