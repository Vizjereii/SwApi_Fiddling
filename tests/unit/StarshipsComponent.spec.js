import Vue from 'vue';
import Vuetify from "vuetify";
import {shallowMount} from '@vue/test-utils';
import Starships from '@/components/Starships.vue';

/* Can't use localVue here, have to use global Vue instance for vuetify registration, 
more info can be found in vuetify issue #4068 and comments */
Vue.use(Vuetify);

describe('Starships component', () => {
    let wrapper;
    const createComponent = ({distanceUserInput = 1000000, starshipsData = []} = {}) => {        
        wrapper = shallowMount(Starships, {   
            data() {
                return {
                    distanceUserInput,
                    starshipsData
                }
            }
        })
    }

    afterEach(() => {
        wrapper.destroy()
    })

    it('renders component', () => {
        createComponent()
        expect(wrapper.exists()).toBe(true)
    })

    it('passes empty `items` prop to data table if there are no data', () => {
        createComponent()

        expect(wrapper.find('.starships-data-table').props('items')).toEqual([])
    })

    it.each([
        [1000000, {MGLT: 1000, consumables: "5 hours"}, 200],
        [1000000, {MGLT: 1000, consumables: "10 hours"}, 100],
        [1000000, {MGLT: 1000, consumables: "0 weeks"}, Number.POSITIVE_INFINITY],
        [1000000, {MGLT: 0, consumables: "1 hour"}, Number.POSITIVE_INFINITY],
        [1000000, {MGLT: 'some string', consumables: "10 hours"}, 'unknown'],
        [1000000, {MGLT: 1000, consumables: "another string"}, 'unknown'],
        [3596, {MGLT: 1000, consumables: "10 week"}, 0],
        [650000000, {MGLT: 1000, consumables: "10 year"}, 7],
        [10000000000, {MGLT: 1000, consumables: "10 months"}, 1369],
        [Number.POSITIVE_INFINITY, {MGLT: 1000, consumables: "10 months"}, Number.POSITIVE_INFINITY],
        ['cat', {MGLT: 1000, consumables: "10 months"}, 'unknown'],
    ])('calculates correct resupplies amount for any input', (distanceInput, starshipStats, expectedResult) => {
        createComponent({distanceUserInput: distanceInput, starshipsData: [starshipStats]});
        expect(wrapper.find('.starships-data-table').props('items')[0].resupplyNum).toBe(expectedResult);
    });
})
