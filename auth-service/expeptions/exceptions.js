class UnauthorizedException extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 401;
        this.name = this.constructor.name;
    }
}
class NotFoundException extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 404;
        this.name = this.constructor.name;
    }
}


module.exports = {UnauthorizedException,NotFoundException}