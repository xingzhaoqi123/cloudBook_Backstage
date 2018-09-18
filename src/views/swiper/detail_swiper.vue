<template>

</template>

<script>
export default {
    data() {
        return {
            swiperDetail: {}
        };
    },
    created() {
        this.swiperDetail = this.$store.state.swiperinfo;
        console.log(this.swiperDetail)
    }
};
</script>

<style>
</style>
