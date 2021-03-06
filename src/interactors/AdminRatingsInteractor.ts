import { DataStore } from "../interfaces/interfaces";
import { Rating, Flag } from "../types/Rating";
import { User } from "../../node_modules/@cyber4all/clark-entity";

export class AdminRatingsInteractor {

    async deleteRating(
        dataStore:            DataStore,
        learningObjectAuthor: string,
        learningObjectName  : string, 
        ratingId:             string
    ): Promise<void> {
        try {
            await dataStore.deleteRating(ratingId,learningObjectName, learningObjectAuthor);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAllFlags(
        dataStore: DataStore
    ): Promise<Flag[]> {
        try {
            const flags = await dataStore.getAllFlags();
            return flags;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getUserFlags (
        dataStore: DataStore,
        username:  string
    ): Promise<Flag[]> {
        try {
            const flags = await dataStore.getUserFlags(username);
            return flags;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getLearningObjectFlags (
        dataStore:            DataStore,
        learningObjectName:   string,
        learningObjectAuthor: string
    ): Promise<Flag[]> {
        try {
            const flags = await dataStore.getLearningObjectFlags(learningObjectName, learningObjectAuthor);
            return flags;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getRatingFlags (
        dataStore:            DataStore,
        learningObjectName:   string,
        learningObjectAuthor: string,
        ratingId:             string
    ): Promise<Flag[]> {
        try {
            const flags = await dataStore.getRatingFlags(learningObjectName, learningObjectAuthor, ratingId);
            return flags;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteFlag (
        dataStore:            DataStore,
        ratingId:             string,
        learningObjectName:   string,
        learningObjectAuthor: string,
        flagId:               string
    ): Promise<void> {
        try {
            await dataStore.deleteFlag(learningObjectName, learningObjectAuthor, ratingId, flagId);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}