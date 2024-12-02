import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import path from "path";
import Components from "unplugin-vue-components/vite";
import NutUIResolver from "@nutui/auto-import-resolver";

import devConfig from "./dev";
import prodConfig from "./prod";

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"vite">(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<"vite"> = {
    projectName: "food",
    date: "2024-11-27",
    designWidth(input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
        return 375;
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750;
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
      375: 2 / 1,
    },
    sass: {
      resource: [path.resolve(__dirname, "../src/styles/custom_theme.scss")],
      data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: ["@tarojs/plugin-html", "@tarojs/plugin-platform-lark"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    defineConstants: {
      TARO_APP_BASE_URL: JSON.stringify(process.env.TARO_APP_BASE_URL), // 这里需要JSON.stringify 序列化一次，否则会报错
    },
    copy: {
      patterns: [],
      options: {},
    },
    framework: "vue3",
    compiler: {
      type: "vite",
      vitePlugins: [
        // 开启 unplugin 插件，自动按需引入 NutUI 组件
        Components({
          resolvers: [
            NutUIResolver({
              taro: true,
              autoImport: true,
              importStyle: false,
            }),
          ],
        }),
      ],
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };
  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
