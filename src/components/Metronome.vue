<template>
    <v-container fill-height grid-list-xl>
       
        <v-layout row wrap justify-content-center align-items-center>
            <v-flex d-flex xs12>
                 <v-layout>
                    <v-flex v-for="i in meter" :key="i" xs3>
                        <v-icon large :color="getLightColour(i)">fas fa-circle</v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 md6 offset-md3>
                <v-card >
                    <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-slider  dark :min="10" :max="400" v-model="tempo" label="BPM"></v-slider>
                                </v-flex>
                                <v-flex xs4 offset-xs4 md2 offset-md5 >
                                    <v-text-field ref="tempo" :min="10" :max="400" dark v-model="tempo" type="number"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex class="text-xs-center" xs8 offset-xs2 md4 offset-md4 child-flex>
                <v-btn v-on:click="play()" fab dark large color="purple">
                        <v-icon dark>{{ playIcon }}</v-icon>
                    </v-btn>
            </v-flex>
        </v-layout>
        
    </v-container>
</template>
<script>
import Worker from '../metronome.worker.js'

export default {
  data () {
    return {
      timerWorker: null,
      playIcon: 'play_arrow',
      normalColour: '',
      beatColour: 'green darken-2',
      currentColoured: -1,
      meter: 4,
      lightColours: [],
      tempo: 120,
      currentBeat: 0,
      accentVolume: 1,
      masterVolume: 0.5,
      quarterVolume: 0.75,
      eighthVolume: 0,
      currentTwelveletNote: 0,
      sixteenthVolume: 0,
      tripletVolume: 0,
      isPlaying: false,
      noteLength: 0.05, // length of "beep" (in seconds)
      lookahead: 25.0, // How frequently to call scheduling function (in milliseconds)
      scheduleAheadTime: 0.1, // How far ahead to schedule audio (sec)
      nextNoteTime: 0.0, // when the next note is due.
      notesInQueue: [], // the notes that have been put into the web audio, and may or may not have played yet. {note, time}
      audioContext: null
    }
  },
  created: function () {
    this.audioContext = new AudioContext()
    this.timerWorker = new Worker()
    var scheduler = this.scheduler
    this.timerWorker.onmessage = function (e) {
      if (e.data === 'tick') {
        scheduler()
      } else {
        console.log('message: ' + e.data)
      }
    }
    this.timerWorker.postMessage({ interval: this.lookahead })
  },
  methods: {
    scheduler: function () {
      while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
        this.scheduleNote(this.currentTwelveletNote, this.nextNoteTime)
        this.nextTwelvelet()
      }
    },
    maxBeats: function () {
      var beats = (this.meter * 12)
      return beats
    },
    calcVolume: function (beatVolume) {
      return (beatVolume * this.masterVolume)
    },
    scheduleNote: function (beatNumber, time) {
      this.notesInQueue.push({ note: beatNumber, time: time })
      var osc = this.audioContext.createOscillator()
      var gainNode = this.audioContext.createGain()
      osc.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      if (beatNumber % this.maxBeats() === 0) {
        if (this.accentVolume > 0.25) {
          osc.frequency.value = 880.0
          gainNode.gain.value = this.calcVolume(this.accentVolume)
        } else {
          osc.frequency.value = 440.0
          gainNode.gain.value = this.calcVolume(this.quarterVolume)
        }
      } else if (beatNumber % 12 === 0) { // quarter notes = medium pitch
        osc.frequency.value = 440.0
        gainNode.gain.value = this.calcVolume(this.quarterVolume)
      } else if (beatNumber % 6 === 0) {
        osc.frequency.value = 440.0
        gainNode.gain.value = this.calcVolume(this.eighthVolume)
      } else if (beatNumber % 4 === 0) {
        osc.frequency.value = 300.0
        gainNode.gain.value = this.calcVolume(this.tripletVolume)
      } else if (beatNumber % 3 === 0) { // other 16th notes = low pitch
        osc.frequency.value = 220.0
        gainNode.gain.value = this.calcVolume(this.sixteenthVolume)
      } else {
        gainNode.gain.value = 0 // keep the remaining twelvelet notes inaudible
      }
      osc.start(time)
      osc.stop(time + this.noteLength)
    },
    getLightColour: function (i) {
      var currentNote = this.currentBeat
      var currentTime = this.audioContext.currentTime
      while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
        currentNote = Math.floor((this.notesInQueue[0].note + 1) / 12) + 1
        this.notesInQueue.splice(0, 1) // remove note from queue
      }

      if (this.currentBeat !== currentNote) {
        this.currentBeat = currentNote
      }
      if (i === this.currentBeat) {
        return this.beatColour
      } else {
        return ''
      }
    },
    nextTwelvelet: function () {
      var secondsPerBeat = 60.0 / this.tempo
      this.nextNoteTime += 0.08333 * secondsPerBeat // Add beat length to last beat time
      this.currentTwelveletNote++ // Advance the beat number, wrap to zero
      if (this.currentTwelveletNote === this.maxBeats()) {
        this.currentTwelveletNote = 0
      }
    },
    play: function () {
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        this.currentTwelveletNote = 0
        this.playIcon = 'pause'
        this.nextNoteTime = this.audioContext.currentTime
        this.timerWorker.postMessage('start')
      } else {
        this.timerWorker.postMessage('stop')
        this.playIcon = 'play_arrow'
      }
    }
  }
}
</script>