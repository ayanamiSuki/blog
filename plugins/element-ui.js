import Vue from 'vue'
import {
    Carousel, CarouselItem, button, form, formItem,
    icon, card, row, col, input, notification, message,
    dialog, dropdown, dropdownMenu, dropdownItem, pagination
} from 'element-ui';

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(button);
Vue.use(form);
Vue.use(formItem);
Vue.use(icon);
Vue.use(card);
Vue.use(row);
Vue.use(col);
Vue.use(input);
Vue.use(dialog);
Vue.use(dropdown);
Vue.use(dropdownMenu);
Vue.use(dropdownItem);
Vue.use(pagination);
Vue.prototype.$notify = notification;
Vue.prototype.$message = message;