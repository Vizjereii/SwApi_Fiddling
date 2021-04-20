import axios from 'axios';

const timePeriodToHoursTable = {
    hour: 1,
    day: 24,
    week: 168,
    month: 730,
    year: 8760
}

export function parseConsumablesToHours(consumablesString) {
    if (consumablesString === 'unknown') return 'unknown';
    
    const pattern = /(\d+)\s([^s\W]+)/;
    const match = consumablesString.match(pattern);
    return match[1] * timePeriodToHoursTable[match[2]];    
}

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