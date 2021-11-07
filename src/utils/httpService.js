import configData from "../config.json";
import{get, put, post} from './Api.js';

const baseUrl = configData.SERVER_URL;

export const getTrainingPlanByUserId = async (userId, token) => {
    return get(`${baseUrl}plan?userId=${userId}`, token);
}

export const createTrainingPlan = async (params, token) => {
    return post(`${baseUrl}plan`, params, token);
}

export const updatePlan = async (id, params, token) => {
    return put(`${baseUrl}plan/${id}`, params, token);
}