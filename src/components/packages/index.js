import upload from './g-upload/';
import select from './images-select/';
const components = [
    upload,
    select
];

const install = function (Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
}

export default install