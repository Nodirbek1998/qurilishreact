import axios from "axios";

const setJWToken = (token) => {
    if (token) {
    // Apply to every request
        axios.defaults.headers.common["Authorization"] = token;
    }
};
export default setJWToken;
