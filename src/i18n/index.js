import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enLocale from './en'
// import zhLocale from './zh'
import antDEnLocale from 'ant-design-vue/lib/locale-provider/en_US'
// import antDZhLocale from 'ant-design-vue/lib/locale-provider/zh_CN'


Vue.use(VueI18n)
const messages = {
    en: {
        ...enLocale,
        ...antDEnLocale
    },
//     zh: {
//         ...zhLocale,
//         ...antDZhLocale
//     }
}

const i18n = new VueI18n({
    // locale:localStorage.getItem("lang") || 'en',
    locale: 'en',
    messages,
})

export default i18n