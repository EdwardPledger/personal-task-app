class RepoError extends Error {
    constructor(message, method, collection, body) {
        super(message);

        this.name = this.constructor.name;
        this.error = message;
        this.method = method;
        this.collection = collection;
        this.body = body;
        this.status = 500;
    }

    errorMessage() {
        return `REPO ERROR: \n\tMethod: ${this.method} \n\tMessage: ${this.message} \n\tCollection: ${this.collection} \n\tBody: ${this.body}`;
    }
}

module.exports = RepoError;