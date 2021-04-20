import Vue from "vue";
import Vuex from "vuex";
import {fetchPaginatedDataRecursive, parseConsumablesToHours} from '@/SwApiHelpers'

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
    getters: {
        getShapedStarshipData: state => distanceParam => {
            const shapedData = [];
                        
            for (const ship of state.starships) {
                const consumablesInHours = parseConsumablesToHours(ship.consumables);
                const resupplyCalc = Math.floor((distanceParam / ship.MGLT) / consumablesInHours);                
                shapedData.push({
                    name: ship.name,
                    model: ship.model,
                    consumablesPeriod: ship.consumables,
                    MGLTperHour: ship.MGLT,
                    resupplyNum: Number.isNaN(resupplyCalc) ? 'unknown' : resupplyCalc
                })
            }
            shapedData.sort((a, b) => {
                if (typeof b.resupplyNum === "string") return -1;
                return b.resupplyNum - a.resupplyNum
            })
            return shapedData;
        }
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