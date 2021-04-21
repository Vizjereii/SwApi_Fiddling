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
          :headers="starshipsTableHeaders"
          :items="getShapedStarshipData"
          :items-per-page=50
          :loading="pageLoading"
          hide-default-footer
          class="elevation-1 starships-data-table"></v-data-table>
    </v-card>
    <v-snackbar v-model="apiFetchException">
      {{ apiFetchExceptionMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="apiFetchException = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import {fetchPaginatedDataRecursive, parseConsumablesToHours} from "@/SwApiHelpers";

export default {
  name: "Starships",
  data() {
    return {
      pageLoading: true,
      starshipsData: [],
      distanceUserInput: 1000000,      
      distanceFieldRules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^[^0-][0-9]*$/
          return pattern.test(value) || 'Please provide valid distance'
        },
      ],
      starshipsTableHeaders: [
        {text: 'Name in movies:', align: 'start', sortable: false, value: 'name'},
        {text: 'Model:', sortable: false, value: 'model',},
        {text: 'Consumables on board for:', sortable: false, value: 'consumablesPeriod'},
        {text: 'MGLT per hour:', sortable: false, value: 'MGLTperHour'},
        {text: 'Required number of resupplies for given distance:', sortable: false, value: 'resupplyNum'},
      ],
      apiFetchException: false,
      apiFetchExceptionMessage: 'Request to swapi.dev failed! Please try again later.',
    }
  },
  computed: {
    getShapedStarshipData() {
      const shapedData = [];
      for (const ship of this.starshipsData) {
        const consumablesInHours = parseConsumablesToHours(ship.consumables);
        const resupplyCalc = Math.floor((this.distanceUserInput / ship.MGLT) / consumablesInHours);
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
  methods: {
    fetchStarshipData() {
      fetchPaginatedDataRecursive("https://swapi.dev/api/starships/", "next", [])
          .then(response => this.starshipsData = response)
          .catch(() => this.apiFetchException = true)
          .finally(() => this.pageLoading = false);
    }
  },
  created() {
    this.fetchStarshipData();
  }
}
</script>