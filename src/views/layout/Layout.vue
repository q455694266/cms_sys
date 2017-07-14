<template>
    <div class="container">
        <layoutTop></layoutTop>
        <layoutLeft></layoutLeft>
    </div>
</template>
<script>
import layoutTop from './layoutTop';
import layoutLeft from './layoutLeft';
export default {
    data() {
        return {

        }
    },
    components:{
        layoutTop,
        layoutLeft
    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        toggleClick() {

        }
    }
}
</script>
<style scoped>

@import '/static/css/layout.css';
</style>