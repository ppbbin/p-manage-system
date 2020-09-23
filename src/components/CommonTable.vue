<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe show-overflow-tooltip>
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="paper" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    handleEdit() {},
    handleDelete() {}
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .paper {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
