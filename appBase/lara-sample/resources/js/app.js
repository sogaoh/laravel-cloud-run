require('./bootstrap');

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { createI18n } from 'vue-i18n'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

async function loadLocaleMessages(i18n, locale){
    const messages = await import(`../lang/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    async setup({ el, app, props, plugin }) {
        const i18n = createI18n({
            legacy: false,
            globalInjection: true,
            locale: __locale
        })

        await loadLocaleMessages(i18n, __locale)

        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(i18n)
            .mixin({ methods: { route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
