<template>
  <view class="index">
    <text @tap="childCall">test页面</text>
    <Child :props-data="propsData" ref="childEl"/>
  </view>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import { useRouter } from "@tarojs/taro";
import "./index.scss";
import Child from "./componets/Child.vue";

const propsData = shallowRef<number>(1);

const childEl=shallowRef<InstanceType<typeof Child>>();

onMounted(() => {
  const router = useRouter();
  propsData.value = Number(router.params.id!);
});

const childCall=()=>{
  childEl.value?.setInit();
}
</script>
