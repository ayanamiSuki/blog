import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

// Vue.use(Element, { locale })

import { Carousel, CarouselItem, button, form, formItem, icon, card, row, col, input, notification, message, dialog } from 'element-ui';

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
Vue.prototype.$notify = notification;

Vue.prototype.$message = message;