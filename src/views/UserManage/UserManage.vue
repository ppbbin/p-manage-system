<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
      <common-form inline :form-label="formLabel" :form="searchForm">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table :table-data="tableData" :tableLabel="tableLabel" :config="config"></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/CommonForm'
import CommonTable from '../../components/CommonTable'

export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期'
        },
        {
          prop: 'addr',
          label: '地址'
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      searchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ]
    }
  },
  methods: {
    getList() {
      this.config.loading = true
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/common';
</style>
