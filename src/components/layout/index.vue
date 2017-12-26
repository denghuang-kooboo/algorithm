<template>
  <el-container>
    <el-header><slot name="header">header</slot></el-header>
    <el-container>
      <el-aside width="10%">
        <slot name="aside">
          <el-menu :default-active="activeIndex" @select="select">
            <el-menu-item index="layout">
              <i class="el-icon-home"></i>
              <span slot="title">Home</span>
            </el-menu-item>
            <el-menu-item index="test">
             <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
         </el-menu>
        </slot>
      </el-aside>
      <el-main><slot>content</slot></el-main>
    </el-container>
    <el-footer><slot name="footer">footer</slot></el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'gb-layout',
  computed: {
    activeIndex () {
      return this.$route.name
    }
  },
  methods: {
    select (name) {
      this.$router.push({
        name: name
      })
    }
  }
}
</script>

<style>
.el-header {
  border-bottom-style: solid;
  border-bottom-color: gray;
  border-bottom-width: 1px;
}

.el-footer {
  border-top-style: solid;
  border-top-color: gray;
  border-top-width: 1px;
}

.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  min-height: 500px;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: gray;
}

.el-main {
  color: #333;
  text-align: center;
  min-height: 500px;
}
</style>