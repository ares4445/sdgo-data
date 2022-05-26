<script setup lang="ts">
import type { ShieldDirection } from '~/models/unit'

const props = defineProps<{ dirs: ShieldDirection }>()
</script>

<template>
  <div class="shield-dir relative m-a">
    <div class="i-ci:dot-03-m absolute" />
    <div v-if="props.dirs.front" class="i-ant-design:caret-up-filled caret absolute" />
    <div v-if="props.dirs.back" class="i-ant-design:caret-down-filled caret absolute" />
    <div v-if="props.dirs.left" class="i-ant-design:caret-left-filled caret absolute" />
    <div v-if="props.dirs.right" class="i-ant-design:caret-right-filled caret absolute" />
  </div>
</template>

<style scoped>
.shield-dir {
  width: 48px;
  height: 48px;
}
.i-ci\:dot-03-m {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.caret {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.i-ant-design\:caret-up-filled {
  margin-top: 0;
}
.i-ant-design\:caret-down-filled {
  margin-bottom: 0;
}
.i-ant-design\:caret-left-filled {
  margin-left: 0;
}
.i-ant-design\:caret-right-filled {
  margin-right: 0;
}
</style>
