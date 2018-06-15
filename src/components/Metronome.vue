<template>
    <v-container fill-height grid-list-xl>
       
        <v-layout row wrap justify-content-center align-items-center>
            <v-flex d-flex xs12>
                 <v-layout>
                    <v-flex xs3 offset-xs1>
                        <v-icon large color="green darken-2">fas fa-circle</v-icon>
                    </v-flex>
                    <v-flex xs3>
                        <v-icon large color="green darken-2">fas fa-circle</v-icon>
                    </v-flex>
                    <v-flex xs3>
                        <v-icon large color="green darken-2">fas fa-circle</v-icon>
                    </v-flex>
                    <v-flex xs3>
                        <v-icon large color="green darken-2">fas fa-circle</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 md6 offset-md3>
                <v-card >
                    <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-slider  dark :min="10" :max="400" v-model="bpm" label="BPM"></v-slider>
                                </v-flex>
                                <v-flex xs2 offset-xs5 >
                                    <v-text-field ref="bpm" :min="10" :max="400" dark v-model="bpm" type="number"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex class="text-xs-center" xs8 offset-xs2 md4 offset-md4 child-flex>
                <v-btn fab dark large color="purple">
                        <v-icon dark>play_arrow</v-icon>
                    </v-btn>
            </v-flex>
        </v-layout>
        
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      bpm: 90,
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }
  }
}
</script>