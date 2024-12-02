<template>
  <view>
    {{ `这是路由传参的数据:${propsData}` }}
    <text>{{ $t("test.name", { name: "动态参数" }) }}</text>
    <view @tap="fetchData">发送请求</view>
    <text>{{ resData }}</text>
    <Button class="btn-max-w" :plain="true" type="primary">按钮</Button>
  </view>
</template>
<script setup lang="ts">
import { defineExpose, shallowRef } from "vue";
import { getTestInfo } from "@/api/test";
import { useI18n } from "@/lang/i18n/index";
import { Button } from "@tarojs/components";

interface Props {
  propsData?: number;
}

withDefaults(defineProps<Props>(), {
  propsData: 0,
});

const setInit = () => {
  const { t } = useI18n();
  console.log("Child初始化了", t("tipInfo.requestFailTips"));
};

const resData = shallowRef("");

const fetchData = async () => {
  const res = await getTestInfo()
  console.log(res)
};

defineExpose({
  setInit,
});
</script>
<style scoped lang="scss"></style>
