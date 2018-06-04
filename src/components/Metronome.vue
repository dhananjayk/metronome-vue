<template>
  <v-container class="mt-2" grid-list-sm justify-space-between>

    <v-layout row wrap justify-space-around>
      <v-btn  fab large dark>
        <v-icon>alarm</v-icon>
      </v-btn>
      <v-btn color="error" fab large dark>
        <v-icon>alarm</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row wrap justify-space-around>
      <circle-slider v-model="sliderValue" 
      :side="250" :min="19" :max="401" 
      :step-size="1" :circle-width-rel="20" 
      :progress-width-rel="10" :knob-radius="10">
        <v-btn color="error" fab large dark>
        <v-icon>alarm</v-icon>
      </v-btn>
      </circle-slider>
    </v-layout>
    
    <v-layout row mt-5 wrap justify-space-around>
      <v-btn  fab large dark>
        <v-icon>alarm</v-icon>
      </v-btn>
      
    </v-layout>

  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
