import { createApp } from "vue";
// 国际化
import i18n from "@/lang/i18n";
import { local } from "@/lang";
import "./app.scss";

const App = createApp({
  onShow(options) {
    // console.log('i18n',i18n)
  },
  onLaunch(options) {
    // initI18n();
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(i18n, local);

export default App;
