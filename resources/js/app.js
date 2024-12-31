import '../css/app.css';
import '../sass/app.scss';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createPinia } from 'pinia';
import { createApp, h } from 'vue';
import { route as ziggyRoute } from 'ziggy-js';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import toast from './plugins/toast';
import ZiggyPlugin from './plugins/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pinia = createPinia();

pinia.use(({ store }) => {
    store.$route = ziggyRoute;
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(pinia)
            .use(ZiggyPlugin)
            .use(toast)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
