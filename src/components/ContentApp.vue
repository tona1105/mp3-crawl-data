<template>
    <div>
        <div>
            <div class="">
                <div class="d-flex justify-content-between align-content-center">
                    <h4 class="text-light fw-bold">Shows to try</h4>
                    <p class="text-light" style="margin-top: 5px; margin-right: 10px;">Show all</p>
                </div>
                <div class="slide text-light row ">
                    <div class="col" v-for="(item, index) in listAlbumRecommend" :key="index">
                        <div class="w-100 bg-info px-3 py-4 text-center rounded">
                            <h4>{{ item }}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 class="text-light fs-1 my-5 fw-bold">New release</h4>
                <div class="d-flex text-light justify-content-between">
                    <div class="d-flex">
                        <div class="btn btn__newReleaseBg" @click="getAllNew"
                            :class="this.keyNewRelease === 'All' ? 'btn__purple' : ''">Tất cả
                        </div>
                        <div class="btn btn__newReleaseBg mx-3" @click="getAllNewInVietNam"
                            :class="this.keyNewRelease === 'VN' ? 'btn__purple' : ''">Việt Nam</div>
                        <div class="btn btn__newReleaseBg" @click="getAllNewInWorld"
                            :class="this.keyNewRelease === 'World' ? 'btn__purple' : ''">Quốc tế</div>
                    </div>
                    <div>Tất cả</div>
                </div>
            </div>
            <div class="d-flex justify-content-between text-light position-relative item__lineDown2"
                style="padding:  10px;">
                <span class="w-50">Bài hát</span>
                <span>Phát hành</span>
                <span>Thời gian</span>
            </div>
            <div v-for="(item, index) in listNewRelease" :key="index" class="position-relative item__lineDown"
                @click="emitPlayList(index)">
                <ItemNewRelease :music="item" />
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
// import ItemContent from './ItemContent.vue';
import { mapMutations } from 'vuex';
import ItemNewRelease from './ItemNewRelease.vue';
import newRelease from '@/assets/data/newRelease.json'
export default {
    data() {
        return {
            listAlbum: [],
            listAlbumRecommend: [
                'BXH Nhạc Mới',
                'Top 100',
                `Artist's Story`,
                'Chill/Thư giãn'
            ],
            listNewRelease: [],
            listItemKey: [],
            keyNewRelease: 'All',
            isListChanged: false 
        }
    },
    components: {
        ItemNewRelease,
    },
    created() {
        this.getListNewRelease()
    },
    methods: {
        getListNewRelease() {
            this.listNewRelease = newRelease.data
            this.isListChanged = true 
        },
        getAllNew() {
            this.listNewRelease = []
            this.keyNewRelease = 'All'
            this.getListNewRelease()
        },
        getAllNewInVietNam() {
            this.listNewRelease = []
            this.keyNewRelease = 'VN'
            const listVN = newRelease.data.filter(item => item.isWorldWide === true)
            this.listNewRelease = listVN
            this.isListChanged = true 

        },
        getAllNewInWorld() {
            this.listNewRelease = []
            this.keyNewRelease = 'World'
            const listVN = newRelease.data.filter(item => item.isWorldWide === false)
            this.listNewRelease = listVN
            this.isListChanged = true 
        },
        async getKeyItem() {
            
            this.listItemKey = []
            const self = this // Lưu trữ ngữ cảnh của Vue 
            for (let item of this.listNewRelease) {
                var url = `mp3.zing.vn${item.link}`
                await axios.get(url)
                    .then(function (response) {
                        var html = response.data;
                        var dataXml = extractDataXml(html);
                        self.listItemKey.push(dataXml.toString())
                        
                    })
                    .catch(function (error) {
                        console.error("Yêu cầu không thành công. Lỗi:", error);
                    });
            }
            // Hàm để trích xuất thuộc tính data-xml từ nội dung trang web
            function extractDataXml(html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                // Tìm và trích xuất thuộc tính data-xml
                var dataXml = doc.querySelector("#zplayerjs-wrapper").getAttribute("data-xml");
                return dataXml;
            }
        },
        ...mapMutations(['updateSharedData']),
        async emitPlayList(index) {
            if(this.isListChanged) {
                await this.getKeyItem()
                this.isListChanged = false
            }
            const data = this.listItemKey
            console.log(data);
            const num = index
            this.updateSharedData({ data, num })
        },


    }
}
</script>
