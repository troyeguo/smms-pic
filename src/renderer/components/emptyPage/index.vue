<template>
  <el-row id="empty-page">
    <el-col :span="24">
      <div>
        <img src="@/assets/empty-page.svg" alt="empty page" class="empty-illustration" />
        <p class="empty-text">{{content}}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default { name: "empty-page", props: ["content"] };
</script>

<style>
.el-row {
  width: 100%;
}
.el-col {
  display: flex;
  justify-content: center;
}
.empty-illustration {
  width: 372px;
  margin-top: 20px;
}
.empty-text {
  font-size: 17px;
  font-weight: bold;
  line-height: 44px;
  color: rgba(47, 47, 47, 1);
  opacity: 1;
  text-align: center;
}
</style>