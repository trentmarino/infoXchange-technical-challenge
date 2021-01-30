

import api from "../utils/api";
export const saveAuthor = async (data, id = undefined) => {
    let response;
    if(id) {
        response = await api.put(`author/${id}`, data);
    } else {
        response = await api.post(`author/`, data);
    }

    return response.data.author;
}