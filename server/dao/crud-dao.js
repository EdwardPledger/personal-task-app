const mongoose = require('mongoose');
const RepoError = require('../errors/repo-error');

/**
 * Generic CRUD operations that can be used by any collection
 */
module.exports = {
    /**
     * Get an object from a collection by it's id
     */
    getObjectById: async (collectionName, id) => {
        try {
            const collectionInstance = mongoose.model(collectionName);
            
            return await collectionInstance.findOne({ _id: id });
        } catch (err) {
            console.log('err', err);
            
            throw new RepoError(err.message, 'getObjectsById', collectionName, id);
        }
    },

    /**
     * Get all objects from a collection
     */
    getObjects: async (collectionName) => {
        try {
            const collectionInstance = mongoose.model(collectionName);

            return await collectionInstance.find({});
        } catch (err) {
            throw new RepoError(err.message, 'getObjects', collectionName, '');
        }
    },

    /**
     * Insert an object of a collection
     * TODO: validate collection name
     */
    insertObject: async (collectionName, document) => {
        try {
            const collectionInstance = mongoose.model(collectionName);
            const newObject = new collectionInstance(document);

            return await newObject.save(); 
        } catch (err) {
            throw new RepoError(err.message, 'insertObject', collectionName, document);
        }
    },

    /**
     * Update an existing object from a collection
     */
    updateObject: async (collectionName, document) => {
        try {
            const collectionInstance = mongoose.model(collectionName);
            const upddatedObject = new collectionInstance(document);
            upddatedObject._id = document._id;
            upddatedObject.isNew = false;
        } catch (err) {
            throw new RepoError(err.message, 'updateObject', collectionName, document);
        }
    },

    /**
     * Delete an existing object from a collection by it's id
     */
    deleteObjectById: async (collectionName, id) => {
        try {
            const collectionInstance = mongoose.model(collectionName);
            
            return await collectionInstance.findOneAndDelete({ _id: id });
        } catch (err) {
            throw new RepoError(err.message, 'deleteObjectsById', collectionName, id);
        }
    },

    /**
     * Delete all objects from a collection
     */
    deleteObjects: async (collectionName) => {
        try {
            const collectionInstance = mongoose.model(collectionName);

            return await collectionInstance.deleteMany({});
        } catch (err) {
            throw new RepoError(err.message, 'deleteObjects', collectionName, '');
        }
    }
}