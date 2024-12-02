import { requestApi } from "@/utils/request";
import { RequestTask } from "@tarojs/taro";

/**
 * 获取测试信息的函数
 *
 * @param data 请求数据
 * @returns 返回Promise对象，包含请求任务，其解析值为字符串
 */
export const getTestInfo = (): Promise<RequestTask<string>> => {
  return requestApi({
    url: '/system/pc/user/getUserDataByUserId',
  })
}