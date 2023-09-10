<template>
    <div class="bg-black h-100">
        <!-- Home + Search -->
        <div class="bg-nav text-light mx-2 mb-2 px-4 py-2">
            <span class="d-flex align-items-baseline"  
                @click="chooseHome"
                :class="this.click === 1 ? 'fw-bold' : ''"
                >
                <i class="fa-solid fa-house"></i>
                <p class="mx-4">Home</p>
            </span>
            <span class="d-flex align-items-baseline"  
                @click="chooseSearch"
                :class="this.click === 2 ? 'fw-bold' : ''">
                <i class="fa-solid fa-magnifying-glass"></i>
                <p class="mx-4">Search</p>
            </span>
        </div>
        <!-- Library -->
        <div class="bg-nav text-light m-2 pb-4">
            <span class="d-flex align-items-baseline justify-content-between px-4 pt-4">
                <div class="d-flex align-items-baseline">
                    <i class="fas fa-book-open"></i>
                    <p class="mx-3">Your Library</p>
                </div>
                <div>
                    <i class="fas fa-plus mx-3"></i>
                    <i class="fas fa-arrow-right"></i>
                </div>
            </span>
            <div>
                <div class="bg-playlist mt-2 mx-2 rounded p-3">
                    <p class="fw-bold">Create your fisrt playlist</p>
                    <p>It's easy, we'll help you</p>
                    <div class="btn btn-light text-dark fw-bold">Create playlist</div>
                </div>
                <div>
                    <div class="bg-playlist mt-4 mx-2 rounded p-3">
                        <p class="fw-bold">Let's find some podcasts to follow</p>
                        <p>We'll keep you updated on new episodes</p>
                        <div class="btn btn-light text-dark fw-bold">Browse podcarts</div>
                    </div>
                </div>
                <!-- Footer -->
                <!-- <div class="footer mt-5">
                <div class="d-flex justify-content-between">
                    <span>Legal</span>
                    <span>Privacy Center</span>
                    <span>Privacy Policy</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Cookies</span>
                    <span>About Ads</span>
                    <span>Accessibility</span>
                </div>  -->
            </div>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            click: 1
        }
    },
    methods: {
        chooseHome() {
            this.click = 1;
        },
        chooseSearch() {
            this.click = 2;
        }
    }
}
</script>

<style>
.notChoose {
    opacity: 0.7;
}
</style>