<template>
    <div class="images-select">
        <label for="">图片裁剪</label>
        <div class="select-main">
            <div class="main-item">
                <img class="thumbnail-img" id="thumbnailImg" 
                    :src="value.url" alt="裁剪图片"
                 />
                <div class="item-setting">
                    <button class="setting-btn" @click="resetImg">更换</button>
                    <button class="setting-btn">删除</button>
                    <button class="setting-btn" @click="fixThumbnailImg">裁剪</button>
                </div>
            </div>
        </div>
        
        <!-- TODO 此处可抽离做组件 -->
        <div class="is-dialog select-dialog" v-if="showDialog">
            <div class="dialog__wrapper" @click="showDialog = false">
            </div>
            <div class="dialog__contain">
                <div class="header">
                    <h3>裁剪图片</h3>
                    <span class="header-close" @click="showDialog = false">X</span>
                </div>
                <div class="body">
                    <canvas class="thumbnail-canvas" id="fixCanvas"
                        @mousedown="fixImgStart" 
                        @mousemove="fixImg"
                        @mouseup="fixImgEnd"
                    ></canvas>
                    <div class="holder" id="holderBox"
                        @mousedown="isMoveHolder = true" 
                        @mousemove="moveHolder"
                        @mouseup="isMoveHolder = false"
                    ></div>

                    <!-- TODO 此处可为组件 -->
                    <div class="is-slider" ref="sliderBar"
                        @mousedown="isSlider = true"
                        @mousemove="sliderMove"
                        @mouseup="isSlider = false"
                    >
                        <!-- 占比 -->
                        <div class="slider__bar" :style='"width:"+ sliderVal +"%"'></div>
                        <!-- 拖动效果 -->
                        <div class="slider__btn" 
                            :style='"margin-left:"+ sliderVal +"%"'
                        ></div>
                        <div class="slider__text">{{ sliderVal }}%</div>
                    </div>
                </div>
                <div class="footer">
                    <button class="is-button" @click="showDialog = false">取消</button>
                    <button class="is-button" @click="resetImg">重选</button>
                    <button class="is-button">确认使用</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Bus from '@/common/bus.js';
    import $ from 'jquery';
    export default {
        name: "images-select",
        props: ["value"], // v-model绑定值
        data() {
            return {
                showDialog: false,
                // 裁剪图片操作
                isFixImg: false,
                fixImgPos: {
                    start: {
                        x: 0, y: 0
                    },
                    end: {
                        x: 0, y: 0
                    }
                },
                // 移动遮罩层
                isMoveHolder: false,
                // 滑动选择
                sliderVal: 20,
                isSlider: false
            }
        },
        mounted(){
            // this.$nextTick(()=>{
            //     this.setImg();
            // })
        },
        methods: {
            setImg(){
                let canvas = $("#fixCanvas")[0], ctx = canvas.getContext("2d");
                let img = document.getElementById("thumbnailImg");

                this.fixImgPos.end = {
                    x: $(canvas).offset().left + $(canvas).width(),
                    y: $(canvas).offset().top + $(canvas).height()
                }
                ctx.drawImage(img, 0, 0, $(canvas).height(), $(canvas).width());
            },
            fixThumbnailImg(){
                this.showDialog = true;
                this.$nextTick(()=>{
                    this.setImg();
                })                
            },
            fixImgStart(evt){
                this.isFixImg = true;

                this.fixImgPos.start = {
                    x: evt.pageX,
                    y: evt.pageY
                }
            },
            fixImg(evt){
                if( this.isFixImg ){
                    this.fixImgPos.end = {
                        x: evt.pageX, y: evt.pageY
                    }
                    let canvas = $("#fixCanvas");

                    $("#holderBox").css({
                        width: this.fixImgPos.end.x - this.fixImgPos.start.x,
                        height: this.fixImgPos.end.y - this.fixImgPos.start.y,
                        left: this.fixImgPos.start.x + 20 - canvas.offset().left,
                        top: this.fixImgPos.start.y + 20 - canvas.offset().top,
                    })
                }
            },
            fixImgEnd(evt){
                this.fixImgPos.end = {
                    x: evt.pageX,
                    y: evt.pageY
                }
                this.isFixImg = false;
            },
            moveHolder(evt){
                evt.stopPropagation();

                if( this.isMoveHolder ){

                    console.log(111);
                    // this.fixImgPos.end = {
                    //     x: evt.pageX, y: evt.pageY
                    // }
                    let canvas = $("#fixCanvas");

                    // $("#holderBox").css({
                    //     left: evt.pageX + 20 - canvas.offset().left,
                    //     top: evt.pageY + 20 - canvas.offset().top,
                    // })
                }
            },
            sliderMove(evt){
                if( this.isSlider ){
                    let slider = $(this.$refs.sliderBar);

                    // TODO 保留N位数 step 可以在此设置
                    let persent = (evt.pageX - slider.offset().left) / slider.width();
                    this.sliderVal = (persent * 100).toFixed(0);
                }
            },
            resetImg(){
                // 无须传参 
                Bus.$emit("reset-upload-img");
                this.showDialog = false;
            }
        },
        watch: {
            sliderVal(val, oldVal){
                let canvas = $("#fixCanvas")[0], ctx = canvas.getContext("2d");
                let img = document.getElementById("thumbnailImg");

                let persent = val / 100 + 1;
                ctx.drawImage(img, 0, 0, $(canvas).height() * persent, $(canvas).width() * persent);
            }
        }
    }
</script>