<template>
  <v-row justify="space-around" class="pa-16">
    <v-card width="auto" elevation="2">
      <v-card-subtitle class="d-flex justify-center">
        Now you are able to find out how many resupply stops a Star Wars ship should make to travel certain distance! 
      </v-card-subtitle>
      <v-text-field label="Distance in MGLT" hint="Input distance here" v-model="distanceUserInput" :rules="distanceFieldRules" class="px-4"></v-text-field>
      <v-data-table :headers="starshipsHeaders"
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
          const pattern = /^[1-9]\d+$/
          return pattern.test(value) || 'Please provide valid distance'
        },
      ],
      starshipsHeaders: [
        {
          text: 'Name in movies',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Model',
          align: 'start',
          sortable: false,
          value: 'model',
        },
        { text: 'consumablesPeriod', value: 'consumablesPeriod' },
        { text: 'MGLT per hour', value: 'MGLTperHour' },
        { text: 'Required resupplies for given distance', value: 'resupplyNum' },
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