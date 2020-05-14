class NotFoundError extends Error {
    constructor(message, method, collection, body) {
        super(message);

        this.name = this.constructor.name;
        this.error = message;
        this.method = method;
        this.collection = collection;
        this.body = body;
        this.status = 404
    }
}

module.exports = NotFoundError;