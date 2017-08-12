<template>
    <div class="images-select">
        <label for="">图片裁剪</label>
        <div class="select-main">
            <div class="main-item">
                <img class="thumbnail-img" id="thumbnailImg" 
                    :src="imgObject.url" alt="裁剪图片"
                 />
                <div class="item-setting">
                    <button class="setting-btn">更换</button>
                    <button class="setting-btn">删除</button>
                    <button class="setting-btn" @click="showDialog = true">裁剪</button>
                </div>
            </div>
        </div>
        
        <!-- TODO 此处可抽离做组件 -->
        <div class="is-dialog" v-if="showDialog">
            <div class="dialog__wrapper" @click="showDialog = false">
            </div>
            <div class="dialog__contain">
                <div class="header">
                    <h3>裁剪图片</h3>
                    <span class="header-close" @click="showDialog = false">X</span>
                </div>
                <div class="body">
                    <canvas class="thumbnail-canvas"></canvas>
                </div>
                <div class="footer">
                    <button class="is-button">取消</button>
                    <button class="is-button">重选</button>
                    <button class="is-button">确认使用</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        name: "images-select",
        data() {
            return {
                imgObject: {
                    name: "img1.jpg", 
                    url: require("img/upload/img1.jpg")
                },
                showDialog: true
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.setImg();
            })
        },
        methods: {
            setImg(){
                let canvas = $(".thumbnail-canvas")[0], ctx = canvas.getContext("2d");
                let img = document.getElementById("thumbnailImg");

                ctx.drawImage(img, 0, 0, 349, 600);
                // ctx.drawImage(img, 33, 71, 104, 124, 21, 20, 87, 104)
            }
        }
    }
</script>