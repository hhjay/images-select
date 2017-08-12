import Upload from './src/app';

Upload.install = function (Vue) {
    Vue.component(Upload.name, Upload);
}

export default Upload;