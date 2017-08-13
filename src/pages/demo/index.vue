<template>
    <div class="demo">
        <g-upload></g-upload>
        <images-select v-model="imgObject"></images-select>
    </div>
</template>
<script>
    import 'less/demo.less';
    import Bus from '@/common/bus.js';
    export default {
        data() {
            return {
                imgObject: {
                    name: "img1.jpg", 
                    url: require("img/upload/img1.jpg")
                },
            }
        }
    }
</script>