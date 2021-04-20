<template>
  <v-app>
    <v-main>
      <Starships></Starships>
    </v-main>
  </v-app>
</template>

<script>
import Starships from "@/components/Starships";
import {mapActions} from 'vuex';

export default {
  name: 'App',
  components: {
    Starships,
  },
  methods: {
    ...mapActions(["fetchStarshipData"])
  },
  created() {
    this.fetchStarshipData();
  }
}
</script>
