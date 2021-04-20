import Vue from "vue";
import Vuex from "vuex";
import {fetchPaginatedDataRecursive} from '@/SwApiHelpers'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        starships: [],
        starshipFetchInProgress: false,
        starshipFetchFinished: false,
        starshipFetchError: false,
    },
    mutations: {
        fetchStarshipStart(state) {
            state.starshipFetchInProgress = true;
        },
        fetchStarshipSuccess(state, payload) {
            state.starships = payload;
            state.starshipFetchInProgress = false;
            state.starshipFetchFinished = true;
        },
        fetchStarshipError(state, payload) {
            console.error("Exception while fetching starship list from the API");
            console.error(payload);
            state.starshipFetchInProgress = false;
            state.starshipFetchError = true;
        },
    },
    actions: {
        fetchStarshipData({commit}) {
            commit("fetchStarshipStart");
            
            fetchPaginatedDataRecursive("https://swapi.dev/api/starships/", "next", [])
                .then(response => {
                    commit("fetchStarshipSuccess", response);
                })
                .catch(exception => commit("fetchStarshipError", exception));
        }
    }
});