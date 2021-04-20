<template>
  <v-row justify="space-around" class="pa-16">
    <v-card min-width="90%" elevation="2" outlined>
      <v-card-title class="d-flex justify-center">
        Now you are able to find out how many resupply stops a Star Wars ship should make to travel certain distance! 
      </v-card-title>
      <v-text-field 
          label="Distance in MGLT" 
          hint="Input distance here" 
          v-model="distanceUserInput" 
          :rules="distanceFieldRules" 
          class="px-4 mb-4"></v-text-field>
      <v-data-table 
          dense
          :headers="starshipsHeaders"
          :items="getShapedStarshipData(distanceUserInput)"
          :items-per-page=50
          hide-default-footer
          class="elevation-1"></v-data-table>
    </v-card>
  </v-row>  
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Starships",
  data() {
    return {
      distanceUserInput: 1000000,
      distanceFieldRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^[^0-][0-9]*$/
          return pattern.test(value) || 'Please provide valid distance'
        },
      ],
      starshipsHeaders: [
        {
          text: 'Name in movies:',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Model:',          
          sortable: false,
          value: 'model',
        },
        { text: 'Consumables on board for:', sortable: false, value: 'consumablesPeriod' },
        { text: 'MGLT per hour:', sortable: false, value: 'MGLTperHour' },
        { text: 'Required number of resupplies for given distance:', sortable: false, value: 'resupplyNum' },
      ],
    }
  },
  computed: {
    ...mapGetters(["getShapedStarshipData"])
  }
}
</script>

<style scoped>

</style>