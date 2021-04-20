<template>
  <v-row justify="space-around" class="pa-16">
    <v-card width="auto" elevation="2">
      <v-card-subtitle class="d-flex justify-center">
        Now you are able to find out how many resupply stops a Star Wars ship should make to travel certain distance! 
      </v-card-subtitle>
      <v-text-field label="Distance in MGLT" hint="Input distance here" value="10000" :rules="distanceFieldRules" class="px-4"></v-text-field>
      <v-data-table :headers="starshipsHeaders"
                    :items="starships"
                    :items-per-page=50
                    hide-default-footer
                    class="elevation-1"></v-data-table>
    </v-card>
  </v-row>  
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Starships",
  data() {
    return {
      distanceFieldRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^[1-9]\d+$/
          return pattern.test(value) || 'Please provide valid number'
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
        { text: 'cost_in_credits', value: 'cost_in_credits' },
        { text: 'length', value: 'length' },
        { text: 'crew', value: 'crew' },
        { text: 'MGLT per hour', value: 'MGLT' },
        { text: 'Required resupplies for given distance', value: 'wtf' },
      ],
    }
  },
  computed: {
    ...mapState(["starships"])
  }
}
</script>

<style scoped>

</style>