import {parseConsumablesToHours, fetchPaginatedDataRecursive} from '@/SwApiHelpers';
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const axiosMock = new MockAdapter(axios);

describe('Api helper functions', () => {
    afterEach(() => {
        axiosMock.reset();
    })
    
    it('Fetches expected data when no recursion is necessary', (done) => {
        axiosMock.onGet("https://swapi.dev/api/starships/").reply(200, {
            next: null,
            results: [5, 6]
        });
        return fetchPaginatedDataRecursive("https://swapi.dev/api/starships/", "no such token", [1,2,3])
            .then(data => {
                done();
                expect(data).toEqual([1,2,3,5,6]);
            })
    })
    
    it('Fetches expected data when recursion is needed', (done) => {
        axiosMock.onGet("https://swapi.dev/api/starships/").reply(200, {
            next: "getNextRecursive",
            results: [1, 2]
        });
        axiosMock.onGet("getNextRecursive").reply(200, {
            next: null,
            results: [3, 4]
        });
        return fetchPaginatedDataRecursive("https://swapi.dev/api/starships/", "next", [])
            .then(data => {
                done();
                expect(data).toEqual([1,2,3,4]);
            })
    })
    
    it.each([
        ['540 years', 4730400],
        ['0 years', 0],
        ['', 'unknown'],
        ['420 someWrongString', 'unknown'],
        [{}, 'unknown'],
        [undefined, 'unknown'],
        ['unknown', 'unknown'],
    ])('Parses consumables string correctly with any input', (stringInput, expectedResult) => {
        const result = parseConsumablesToHours(stringInput);
        expect(result).toBe(expectedResult);
    })
})