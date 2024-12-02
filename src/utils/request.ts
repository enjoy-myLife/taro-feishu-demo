import { request, showToast } from "@tarojs/taro";
import { useI18n } from '@/lang/i18n/index';

const SuccessCode = '200';
const baseUrl = process.env.TARO_APP_BASE_URL;
/**
 * 请求API函数
 *
 * @param config 请求配置对象，包含除'success'和'fail'之外的所有request函数参数
 * @returns 返回一个Promise对象，用于处理异步请求结果
 */

export const requestApi = (config: Omit<Parameters<typeof request>[0], 'success' | 'fail'>): any => {
  const { t } = useI18n();
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      ...config,
      url: baseUrl + config.url,
      success: (respones: any) => {
        const res = respones?.data;
        if (!res || res?.status !== SuccessCode) {
          showToast({ title: res.message, icon: 'error', duration: 3000 })
          reject(new Error(res.message));
          return;
        }
        resolve(res?.data);
      },
      fail: (err) => {
        showToast({ title: t('tipInfo.requestFailTips'), icon: 'error', duration: 3000 })
        reject(err);
      },
    });
  })
}