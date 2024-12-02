import { requestApi } from "@/utils/request";
import { RequestTask } from "@tarojs/taro";

import { MiniAppPort } from '@/typeing/const';
import { LoginParamsInterface } from '@/pages/login/type';

export const loginIn = (data: LoginParamsInterface): Promise<RequestTask<string>> => {
  return requestApi({
    url: "/publicMethod/pc/login/h5login", data: {
      port: MiniAppPort,
      ...data,
    }
  });
}