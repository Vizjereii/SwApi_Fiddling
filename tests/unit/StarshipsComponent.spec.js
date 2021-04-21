import Vue from 'vue';
import Vuetify from "vuetify";
import {shallowMount} from '@vue/test-utils';
import Starships from '@/components/Starships.vue';

/* Can't use localVue here, have to use global Vue instance for vuetify registration, 
more info can be found in vuetify issue #4068 and comments */
Vue.use(Vuetify);

const mockResponseData = [
    {MGLT: 1000, consumables: "5 hours"}, 
    {MGLT: 1000, consumables: "10 hours"}];

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

    it('calculates correct resupplies amount', () => {
        createComponent({distanceUserInput:10000, starshipsData: mockResponseData})

        expect(wrapper.find('.starships-data-table').props('items')[0].resupplyNum).toBe(2)
        expect(wrapper.find('.starships-data-table').props('items')[1].resupplyNum).toBe(1)
    })
})
