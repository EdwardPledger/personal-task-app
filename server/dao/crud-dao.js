const mongoose = require('mongoose');

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
            console.error(`Repo Error (getObjectById): \n${err}`);
        }
    },

    /**
     * Get all objects from a collection
     */
    getObjects: async (collectionName) => {
        try {
            const collectionInstance = mongoose.model(collectionName);
            throw new Error('test');
            return await collectionInstance.find({});
        } catch (err) {
            throw new Error(`Repo Error (getObjects): \n${err}`);
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
            console.error(`Repo Error (insertObject): \n${err}`);
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
            console.error(`Repo Error (updateObject): \n${err}`);
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
            console.error(`Repo Error (deleteObjectById): \n${err}`);
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
            console.error(`Repo Error (deleteObjects): \n${err}`);
        }
    }
}