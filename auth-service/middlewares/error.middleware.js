const { NotFoundException } = require("../expeptions/exceptions");

module.exports = {
    // eslint-disable-next-line no-unused-vars
        otherError : (err,req,res,next) => {
            err.statusCode = err.statusCode || 500;
            console.log(err);
             
            return res
                .status(err.statusCode)
                .json({
                    success : false,
                    message : err.message,
                    data : null
                });
        },
        // eslint-disable-next-line no-unused-vars
        notFoundError : (req,res,next) => {
            try {
                console.log('baseurl:',req.baseurl);
                throw new NotFoundException('Not found');
            } catch (err) {
                console.log(err);
                return res
                    .status(err.statusCode)
                    .json({
                        success : false,
                        message : err.message,
                        data : null
                    });
            }
            
        }
    };