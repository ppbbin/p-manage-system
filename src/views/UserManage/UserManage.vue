<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" icon="el-icon-plus" @click="addUser">新增</el-button>
      <common-form inline :form-label="formLabel" :form="searchForm">
        <el-button type="primary" @click="searchUser">搜索</el-button>
      </common-form>
    </div>
    <common-table :table-data="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList" @edit="editUser" @del="delUser"></common-table>
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
      handleSuccessCode: 20000,
      operateType: 'add',
      isShow: false,
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
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址'
        }
      ],
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
    },
    addUser() {
      this.operateForm = {}
      this.operateType = 'add'
      this.isShow = true
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    searchUser() {
      this.config.loading = true
      this.$http
        .get('/api/user/getUser', {
          params: {
            name: this.searchForm.keyword
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
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .get('/api/user/del', {
              params: {
                id: row.id
              }
            })
            .then(res => {
              if (res.data.code !== this.handleSuccessCode) {
                this.$message({
                  type: 'warning',
                  message: '删除失败!'
                })
                return
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    confirm() {
      switch (this.operateType) {
        case 'edit':
          this.$http.post('/api/user/edit', this.operateForm).then(res => {
            if (res.data.code !== this.handleSuccessCode) {
              return
            }
            this.isShow = false
            this.getList()
          })
          break
        case 'add':
          this.$http.post('/api/user/add', this.operateForm).then(res => {
            if (res.data.code !== this.handleSuccessCode) {
              return
            }
            this.isShow = false
            this.getList()
          })
          break
      }
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
