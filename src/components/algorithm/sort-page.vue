<template>
  <gb-layout>
    <el-row>
      <el-col :span="2">开始</el-col>
      <el-col :span="3"><el-input v-model="create.begin"></el-input></el-col>
      <el-col :span="2">结束</el-col>
      <el-col :span="3"><el-input v-model="create.end"></el-input></el-col>
      <el-col :span="2">间距</el-col>
      <el-col :span="3"><el-input v-model="create.step"></el-input></el-col>
      <el-col :span="2"></el-col>
      <el-col :span="4"><el-button @click="generate">生成数据</el-button></el-col>
      <el-col :span="3"><el-button @click="sortHandler">排序</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="2">总耗时：</el-col>
      <el-col :span="22">
        <div style="text-align: left;">
          <i v-if="loading" class="el-icon-loading"></i>
          <div v-else>{{ costTime + 'ms' }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
          排序前：
      </el-col>
      <el-col :span="22">
        <div style="text-align: left;">
          {{ input }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        排序后：
      </el-col>
      <el-col :span="22">
        <div style="text-align: left;">
          {{ result }}
        </div>
      </el-col>
    </el-row>
  </gb-layout>
</template>

<script>
import _ from 'lodash'
import Mock from 'mockjs'
import sort from 'sort-list/insertion'
export default {
  name: 'sort-base',
  data () {
    return {
      create: {
        begin: 1,
        end: 100,
        step: 1
      },
      inputData: [],
      resultData: [],
      costTime: 0,
      loading: false
    }
  },
  computed: {
    input () {
      let length = this.inputData.length
      if (length > 20) {
        let prevData = _.slice(this.inputData, 0, 10)
        let lastData = _.slice(this.inputData, length - 10, length)
        return _.join(prevData, ' , ') + ' , ...... , ' + _.join(lastData, ' , ')
      }
      return _.join(this.inputData, ' , ')
    },
    result () {
      let length = this.resultData.length
      if (length > 20) {
        let prevData = _.slice(this.resultData, 0, 10)
        let lastData = _.slice(this.resultData, length - 10, length)
        return _.join(prevData, ' , ') + ' , ...... , ' + _.join(lastData, ' , ')
      }
      return _.join(this.resultData, ' , ')
    },
    isValid () {
      if (!this.create) {
        return false
      }
      let begin = parseInt(this.create.begin)
      if (isNaN(begin)) {
        return false
      }
      let end = parseInt(this.create.end)
      if (isNaN(end)) {
        return false
      }
      let step = parseInt(this.create.step)
      if (isNaN(step) || step < 1) {
        return false
      }
      if (begin >= end) {
        return false
      }
      if (end - begin < step) {
        return false
      }
      return true
    }
  },
  created () {
    this.generate()
  },
  methods: {
    generate () {
      if (!this.isValid) {
        this.$message.error('请输入合法数据构造数组！')
        return
      }
      let begin = parseInt(this.create.begin)
      let end = parseInt(this.create.end)
      let step = parseInt(this.create.step)
      let array = Mock.Random.range(begin, end, step)
      this.inputData = _.shuffle(array)
      this.$message({
        message: '数据生成成功！',
        type: 'success'
      })
    },
    sortHandler () {
      if (this.inputData.length < 1) {
        this.$message.error('请先构造待排序数组！')
        return
      }
      let data = _.cloneDeep(this.inputData)
      // let sort = require('sort-list/insertion')
      this.loading = true
      setTimeout(() => {
        this.$nextTick(() => {
          let begin = Date.now()
          let result = sort(data)
          let end = Date.now()
          this.loading = false
          this.costTime = end - begin
          this.resultData = result
          this.$message({
            message: '排序成功！',
            type: 'success'
          })
        })
      }, 200)
    }
  },
  watch: {
    inputData: {
      handler () {
        this.resultData = []
      },
      deep: true
    }
  }
}
</script>

<style>
  .el-row {
    margin-top: 10px;
  }
</style>

