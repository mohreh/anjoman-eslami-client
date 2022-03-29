import { createStore } from "vuex";

import { aboutFields } from "./modules/AboutFields";
import { news } from "./modules/news";
import { statements } from "./modules/Statements";
import { talks } from "./modules/Talks";
import { events } from "./modules/Events";
import { auth } from "./modules/Auth";

export const store = createStore({
  modules: {
    aboutFields,
    news,
    statements,
    talks,
    events,
    auth,
  },
});
