import axios from './config';

const BASE_URL = "/api/homeSection/";

function addSection(section) {
    return axios.post(BASE_URL + 'addSection', JSON.stringify(section), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function updateSection(section) {
    return axios.post(BASE_URL + 'updateSection', JSON.stringify(section), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function deleteSection(sectionId) {
    return axios.post(BASE_URL + 'deleteSection', JSON.stringify({
        sectionId
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getSectionList() {
    return axios.get(BASE_URL + 'getSectionList');
}

export default {
    addSection,
    getSectionList,
    updateSection,
    deleteSection
}