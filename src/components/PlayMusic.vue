<template>
    <div class="fixed-bottom bg-dark text-light row" style="height: 10%;">
        <div class="col-4 d-flex align-items-center">
            <div>Ảnh</div>
            <div class="text-light mx-3">
                <div>{{ itemTitle }}</div>
                <div>{{ itemArtist }}</div>
            </div>
        </div>
        <div class="control text-center text-light col-5">
            <div class="btn btn-repeat text-light" @click="loopSong" :style="isLoop ? { backgroundColor: 'pink' } : ''">
                <i class="fas fa-redo"></i>
            </div>
            <div class="btn btn-prev" @click="previousSong">
                <i class="fas fa-step-backward"></i>
            </div>
            <div class="btn btn-toggle-play" :style="!isPlayed ? { display: 'none' } : ''" @click="pauseAudio()">
                <i class="fas fa-pause icon-pause"></i>
            </div>
            <div class="btn btn-toggle-play" :style="isPlayed ? { display: 'none' } : ''" @click="playAudio()">
                <i class="fas fa-play icon-play"></i>
            </div>
            <div class="btn btn-next" @click="nextSong">
                <i class="fas fa-step-forward"></i>
            </div>
            <div class="btn btn-random" @click="toggleRandom" :style="isRandom ? { backgroundColor: 'pink' } : ''">
                <i class="fas fa-random"></i>
            </div>
            <vue-slider id="progress" class="progress" type="range" step="1" :min="0" :max="100" v-model="progress"
                @change="changeProgress" />
            <audio ref="audio" @timeupdate="updateProgress" @ended="onAudioEnd"></audio>
        </div>
        <div class="volume col-3 d-flex align-items-center">
            <i class="fas fa-volume-up volume-btn"></i>
            <vue-slider type="range" ref="volume" class=" w-75 volume-range" :min="0" :max="100" v-model="vol"
                @change="changeVol" />
        </div>


    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VueSlider from 'vue-slider-component'
import axios from 'axios'
export default {
    data() {
        return {
            listDetailItem: [],
            isPlaying: 0,
            itemThumb: '',
            itemTitle: '',
            itemArtist: '',
            itemPlaying: '',
            isPlayed: false,
            vol: 100,
            progress: 0,
            isListReady: false,
            isLoop: false,
            isRandom: false
        }
    },
    components: {
        VueSlider
    },
    computed: {
        ...mapState(['listPlay']),
        ...mapState(['idPlay']),
        // computedValue() {
        //     // Truy cập listPlay như một thuộc tính
        //     return this.listPlay;
        // }

    },
    created() {
        console.log('Giá trị computed ban đầu:', this.computedValue);
    },
    watch: {
        listPlay: {
            handler(newValue) {
                // Khi dữ liệu từ Vuex thay đổi, bạn có thể cập nhật listPlayItem
                this.listMusic = [...newValue]; // Sử dụng spread operator để tạo một bản sao của mảng
                this.getDetailItem(this.listMusic)
                this.isListReady = true;
            },
            immediate: true,
        },

        idPlay: {
            handler(newValue) {
                // Khi dữ liệu từ Vuex thay đổi, bạn có thể cập nhật listPlayItem
                // Sử dụng spread operator để tạo một bản sao của mảng
                this.setSong(newValue)
                this.playAudio()
                console.log(newValue);
            },
            immediate: true,
            // Kiểm tra biến isListReady trước khi gọi setSong() và playAudio()
        },
    },
    methods: {

        async getDetailItem(listMusic) {
            this.listDetailItem = []; // Xóa danh sách hiện tại
            for (let item of listMusic) {
                const res = await axios.get(`http://mp3.zing.vn/xhr${item}}`)
                this.listDetailItem.push(res.data.data);
            }
            console.log(this.listDetailItem);
        },

        setSong(id) {
            this.$refs.audio.src = this.listDetailItem[id].source['128']
            console.log(this.listDetailItem);
            this.itemThumb = this.listDetailItem[id].thumb
            this.itemTitle = this.listDetailItem[id].title
            this.itemArtist = this.listDetailItem[id].artists_names
        },
        playAudio() {
            this.$refs.audio.play()
            console.log(this.$refs.audio.src);
            this.isPlayed = true
        },
        pauseAudio() {
            this.$refs.audio.pause()
            this.isPlayed = false

        },
        changeVol() {
            this.$refs.audio.volume = this.vol / 100
            console.log(this.vol);
        },
        updateProgress() {
            const audio = this.$refs.audio;
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            if (!isNaN(duration) && isFinite(duration)) {
                this.progress = (currentTime / duration) * 100;
            }
            else {
                this.progress = 0
            }
        },
        changeProgress() {
            const time = this.$refs.audio.duration * this.progress / 100
            this.$refs.audio.currentTime = time
        },
        ...mapMutations(['nextPlay']),
        ...mapMutations(['randomPlay']),
        nextSong() {
            if (this.isRandom) this.randomPlay()
            else this.nextPlay()
        },
        ...mapMutations(['previousPlay']),
        previousSong() {
            if (this.isRandom) this.randomPlay()
            else this.previousPlay()
        },
        toggleRandom() {
            if (this.isRandom) this.isRandom = false
            else this.isRandom = true
            console.log(this.isRandom);
        },
        loopSong() {
            if (this.isLoop) this.isLoop = false
            else this.isLoop = true
        },
        onAudioEnd() {
            if (this.isLoop) {
                this.$refs.audio.currentTime = 0
                this.playAudio()
            }
            else this.nextSong()
        }
    }
}
</script>
