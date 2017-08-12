<template>
    <div class="g-upload">
        <!-- 其实is是images-select的意思，我也不知道为什么要取这个名字 -->
        <label for="">图片</label>
        <div class="is-input is-upload">
            <!-- 并不想引入icon文件 -->
            <i class="is-input__icon" @click='iconClick'>+</i>

            <input type="file" name="file" ref="input" class="is-input__inner" @change="fileChange" />
        </div>
    </div>
</template>
<script>
    import 'less/lib.less';
    import $ from 'jquery';
    export default {
        name: "g-upload",
        methods: {
            data(){
                return {
                    fileName: "file",
                }
            },
            iconClick(){
                this.$refs.input.click();
            },
            fileChange(evt){
                // 获取文件 暂时不多选 能上传即可
                let files = $(evt.target.files);

                // formdata上传
                let formData = new FormData();
                formData.append('file', files[0]);
                
                console.log(formData);
                
                // TODO好像需要自己手动写个上传图片的接口
                $.ajax({
                    url: "/upload",
                    type: "post",
                    data: {},
                    success: data=>{
                        console.log(data);
                    },
                    error: err=>{
                        console.log(1111);
                    }
                })
            },
        }
    }
</script>