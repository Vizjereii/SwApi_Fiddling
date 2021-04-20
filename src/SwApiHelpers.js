import axios from 'axios';

export function fetchPaginatedDataRecursive(dataUrl, nextPageTokenName, results) {
    return axios
        .get(dataUrl)
        .then(response => {
            const fetchedData = results.concat(response.data.results);
            if (response.data[nextPageTokenName]) {
                return fetchPaginatedDataRecursive(response.data[nextPageTokenName], nextPageTokenName, fetchedData);
            } else {
                return fetchedData;
            }
        })
}