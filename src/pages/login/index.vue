<
<template>
  <view>
    asfasf
    <nut-button type="primary">Primary</nut-button>
  </view>
</template>
<script setup lang="ts">
import { showLoading } from "@tarojs/taro";
import { loginIn } from "@/api/login";

// import { LoginParamsInterface } from "./type";
import { UserStorageKey } from "@/typeing/const";
import Storage from "@/utils/storage";
import { useI18n } from "@/lang/i18n";

const init = () => {
  const userInfo = Storage.get(UserStorageKey);
  if (userInfo?.token) {
    login;
  }
};

const login = async (data: LoginParamsInterface) => {
  const { t } = useI18n();
  showLoading({ title: t("tipInfo.loadingTips") });
  await loginIn(data);
};
</script>
<style scoped lang="scss"></style>
