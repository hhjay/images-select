# images-select

> 图片裁剪

## 构建
- 使用vue-cli构建? 1、时间有点紧，想尽快完工 2、vue的构建比较熟悉，所以不想在此处浪费一些时间，快速开发核心功能

## 进度
- 图片上传
    - 已获取到图片，但是图片移动到服务端还有问题
- 图片裁剪
    - 思路：使用canvas，mousedown记录初始xy，mouseup的时候记录结束xy，计算出对应的大小位置
- 目前已完成整体布局，但是静不下心来写。。。


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```