import Select from './src/app';

Select.install = function (Vue) {
    Vue.component(Select.name, Select);
}

export default Select;