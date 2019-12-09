import axios from "axios";


const API_URL = "http://localhost:49561/Api/";
const USERS = "Users";
const ADVERTS = "Advert/";
const BYFILTERS = "ByFilters";

export const userLogIn = async params => {
    /**
     * LogIn user with credentials
     */
    return await axios.post(`${API_URL}${USERS}`, { mode: 'no-cors', params})
        .then(response => {
            if (response.status === 200) {
                return {
                    error: null,
                    data: response.data
                }
            } else {
                return {
                    error: 'Can\'t Log In with such credentials',
                    data: {}
                }
            }
        })
        .catch(errorResponse => {
            return {
                error: `Something went wrong with status code ${errorResponse.status}`,
                data: {}
            }
        })
};

export const userRegister = async params => {
    /**
     * Register user
     */
    return await axios.post(`${API_URL}${USERS}`, params)
        .then(response => {
            if (response.status === 200) {
                return {
                    error: null,
                    data: response.data
                }
            } else {
                return {
                    error: 'Can\'t register, user already exist',
                    data: {}
                }
            }
        })
        .catch(errorResponse => {
            return {
                error: `Something went wrong with status code ${errorResponse.status}`,
                data: {}
            }
        })
};

export const fetchAdverts = async params => {
    /**
     * GET list of adverts from API by parameters
     */
    return await axios.get(`${API_URL}${ADVERTS}`, { mode: 'no-cors', params})
        .then(response => {
            if (response.status === 200) {
                return {
                    error: null,
                    data: response.data
                }
            } else {
                //TODO: 404 status could be processed by code
                return {
                    error: 'No data found',
                    data: null
                }
            }
        })
        .catch(errorResponse => {
            return {
                error: `Something went wrong with status code ${errorResponse.status}`,
                data: null
            }
        });

};

export const fetchFilterAdverts = async params => {
    /**
     * GET list of adverts from API by parameters
     */
    return await axios.get(`${API_URL}${ADVERTS}${BYFILTERS}`, { mode: 'no-cors', params})
        .then(response => {
            if (response.status === 200) {
                return {
                    error: null,
                    data: response.data
                }
            } else {
                //TODO: 404 status could be processed by code
                return {
                    error: 'No data found',
                    data: null
                }
            }
        })
        .catch(errorResponse => {
            return {
                error: `Something went wrong with status code ${errorResponse.status}`,
                data: null
            }
        });

};
