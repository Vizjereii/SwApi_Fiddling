<template>
  <v-app>
    <v-main>
      <Starships></Starships>
    </v-main>
  </v-app>
</template>

<script>
import Starships from "@/components/Starships";

export default {
  name: 'App',
  components: {
    Starships,
  },
}
</script>
