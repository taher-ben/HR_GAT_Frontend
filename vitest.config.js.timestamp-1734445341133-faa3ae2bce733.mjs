// vitest.config.js
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { mergeConfig, defineConfig as defineConfig2, configDefaults } from "file:///C:/Users/%D8%AE%D9%88%D9%83%D9%85%20%D8%A7%D9%84%D8%B7%D8%A7%D9%87%D8%B1/vit/HR_GAT_Frontend/node_modules/vitest/dist/config.js";

// vite.config.js
import { fileURLToPath, URL as URL2 } from "node:url";
import { defineConfig } from "file:///C:/Users/%D8%AE%D9%88%D9%83%D9%85%20%D8%A7%D9%84%D8%B7%D8%A7%D9%87%D8%B1/vit/HR_GAT_Frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/%D8%AE%D9%88%D9%83%D9%85%20%D8%A7%D9%84%D8%B7%D8%A7%D9%87%D8%B1/vit/HR_GAT_Frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///C:/Users/%D8%AE%D9%88%D9%83%D9%85%20%D8%A7%D9%84%D8%B7%D8%A7%D9%87%D8%B1/vit/HR_GAT_Frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/%D8%AE%D9%88%D9%83%D9%85%20%D8%A7%D9%84%D8%B7%D8%A7%D9%87%D8%B1/vit/HR_GAT_Frontend/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL2("./src", __vite_injected_original_import_meta_url))
    }
  }
});

// vitest.config.js
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/%D8%AE%D9%88%D9%83%D9%85%20%D8%A7%D9%84%D8%B7%D8%A7%D9%87%D8%B1/vit/HR_GAT_Frontend/vitest.config.js";
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath2(new URL("./", __vite_injected_original_import_meta_url2))
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5qcyIsICJ2aXRlLmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1MDYyRVx1MDY0OFx1MDY0M1x1MDY0NSBcdTA2MjdcdTA2NDRcdTA2MzdcdTA2MjdcdTA2NDdcdTA2MzFcXFxcdml0XFxcXEhSX0dBVF9Gcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcXHUwNjJFXHUwNjQ4XHUwNjQzXHUwNjQ1IFx1MDYyN1x1MDY0NFx1MDYzN1x1MDYyN1x1MDY0N1x1MDYzMVxcXFx2aXRcXFxcSFJfR0FUX0Zyb250ZW5kXFxcXHZpdGVzdC5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLyVEOCVBRSVEOSU4OCVEOSU4MyVEOSU4NSUyMCVEOCVBNyVEOSU4NCVEOCVCNyVEOCVBNyVEOSU4NyVEOCVCMS92aXQvSFJfR0FUX0Zyb250ZW5kL3ZpdGVzdC5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IG1lcmdlQ29uZmlnLCBkZWZpbmVDb25maWcsIGNvbmZpZ0RlZmF1bHRzIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcclxuaW1wb3J0IHZpdGVDb25maWcgZnJvbSAnLi92aXRlLmNvbmZpZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKFxyXG4gIHZpdGVDb25maWcsXHJcbiAgZGVmaW5lQ29uZmlnKHtcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgICAgIGV4Y2x1ZGU6IFsuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLCAnZTJlLyoqJ10sXHJcbiAgICAgIHJvb3Q6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSksXHJcbilcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdTA2MkVcdTA2NDhcdTA2NDNcdTA2NDUgXHUwNjI3XHUwNjQ0XHUwNjM3XHUwNjI3XHUwNjQ3XHUwNjMxXFxcXHZpdFxcXFxIUl9HQVRfRnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFx1MDYyRVx1MDY0OFx1MDY0M1x1MDY0NSBcdTA2MjdcdTA2NDRcdTA2MzdcdTA2MjdcdTA2NDdcdTA2MzFcXFxcdml0XFxcXEhSX0dBVF9Gcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvJUQ4JUFFJUQ5JTg4JUQ5JTgzJUQ5JTg1JTIwJUQ4JUE3JUQ5JTg0JUQ4JUI3JUQ4JUE3JUQ5JTg3JUQ4JUIxL3ZpdC9IUl9HQVRfRnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVEZXZUb29scygpLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VyxTQUFTLGlCQUFBQSxzQkFBcUI7QUFDMVksU0FBUyxhQUFhLGdCQUFBQyxlQUFjLHNCQUFzQjs7O0FDRDhTLFNBQVMsZUFBZSxPQUFBQyxZQUFXO0FBRTNZLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUp5SyxJQUFNLDJDQUEyQztBQU9sUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUlDLEtBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FEakJrTSxJQUFNQyw0Q0FBMkM7QUFJcFAsSUFBTyx3QkFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBQyxjQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsTUFDYixTQUFTLENBQUMsR0FBRyxlQUFlLFNBQVMsUUFBUTtBQUFBLE1BQzdDLE1BQU1DLGVBQWMsSUFBSSxJQUFJLE1BQU1GLHlDQUFlLENBQUM7QUFBQSxJQUNwRDtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJmaWxlVVJMVG9QYXRoIiwgImRlZmluZUNvbmZpZyIsICJVUkwiLCAiVVJMIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwiLCAiZGVmaW5lQ29uZmlnIiwgImZpbGVVUkxUb1BhdGgiXQp9Cg==