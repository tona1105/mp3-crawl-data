<template>
    <div>
        <div class="d-flex text-light justify-content-between item__newRelease" style="padding: 10px;">
            <div class="d-flex" style="width: 50%">
                <div>0</div>
                <img :src="music.thumbnail" alt="" style="height: 40px; width: 40px;" class="mx-2">
                <div>
                    <div class="fw-bold">{{ music.title }}</div>
                    <div style="font-size: 0.8rem;">
                        {{ music.artistsNames }}
                    </div>
                </div>
            </div>
            <div style="color: #97939C">
                Hôm nay
            </div>
            <div style="color: #97939C">
                {{ fancyTimeFormat(music.duration) }}
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        music: {
            type: Object,
            required: true,
            defaul() {
                return {}
            }
        }
    },
    methods: {
        fancyTimeFormat(duration) {
            // Hours, minutes and seconds
            const hrs = ~~(duration / 3600);
            const mins = ~~((duration % 3600) / 60);
            const secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            let ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;

            return ret;
        }
    }
}
</script>