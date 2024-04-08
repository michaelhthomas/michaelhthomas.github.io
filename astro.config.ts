import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import unocss from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    unocss({
      injectReset: true
    })
  ]
});
