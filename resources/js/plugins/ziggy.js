import { route as ziggyRoute } from 'ziggy-js';

export default {
    install(app) {
        app.config.globalProperties.$route = ziggyRoute;
    },
};
