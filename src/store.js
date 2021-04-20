import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
            return axios.get("https://swapi.dev/api/starships/")
                .then(response => {
                    commit("fetchStarshipSuccess", response.data);
                    console.log(response.data);
                })
                .catch(exception => commit("fetchStarshipError", exception));
        }
    }
});