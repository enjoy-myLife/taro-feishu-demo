import type { UserConfigExport } from "@tarojs/cli";
const path = require('path');
const glob = require('glob');

// 读取 mock 目录下的所有 mock 文件，并合并到一个对象中
function loadMocks() {
  const mockDir = path.resolve(__dirname, '../src/mock');
  const mockFiles = glob.sync(`${mockDir}/**/*.ts`);
  const mocks = {};

  mockFiles.forEach((file) => {
    const mockData = require(file);
    Object.assign(mocks, mockData);
  });
  return mocks;
}

export default {
  plugins: [['@tarojs/plugin-mock', {
    mocks: loadMocks(),
    port: 9527
  }]],
  mini: {},
  h5: {}
} satisfies UserConfigExport<'vite'>
