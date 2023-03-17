import { defineConfig, CommonServerOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import dotenv, { DotenvParseOutput } from 'dotenv';
import path, { join } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
// 对象形式
// export default defineConfig({
//   plugins: [vue()]
// })
// 函数形式
export default defineConfig((mode) => {
  const envFileName: string = '.env';
  const curEnvFileName = `${envFileName}.${mode.mode}`;

  let server: CommonServerOptions = {};
  const envData = fs.readFileSync(curEnvFileName);
  const envMap: DotenvParseOutput = dotenv.parse(envData); // 解析 key值对形式
  console.log('envMap', envMap);
  if (mode.mode === 'development') {
    server = {
      host: envMap.VITE_HOST,
      // host: '172.20.10.4',
      port: parseInt(envMap.VITE_PORT),
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN,
        },
      },
    };
  } else if (mode.mode === 'production') {
    server = {
      host: envMap.VITE_HOST,
      port: parseInt(envMap.VITE_PORT),
    };
  }

  console.log(mode.mode, ' --> ', server);
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
    ],
    server,
    resolve: {
      alias: {
        '@': join(__dirname, '/src'),
      },
    },
  };
});
