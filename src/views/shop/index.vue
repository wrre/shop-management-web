<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        type="primary"
        size="small"
        @click="createShopDialogFormVisible = true"
      >
        建立
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="#" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 + offset }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名稱">
        <template slot-scope="{row}">
          <span v-if="editRow.id === row.id">
            <el-input v-model="row.name" class="edit-input" size="small" />
          </span>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template slot-scope="{row}">
          <span v-if="editRow.id === row.id">
            <el-input v-model="row.address" class="edit-input" size="small" />
          </span>
          <span v-else>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="電話" width="200">
        <template slot-scope="{row}">
          <span v-if="editRow.id === row.id">
            <el-input v-model="row.phone" class="edit-input" size="small" />
          </span>
          <span v-else>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="負責人" width="200">
        <template slot-scope="{row}">
          <span v-if="editRow.id === row.id">
            <el-input v-model="row.personInCharge" class="edit-input" size="small" />
          </span>
          <span v-else>{{ row.personInCharge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span v-if="editRow.id === row.id">
            <el-button
              type="success"
              size="small"
              @click="confirmEdit(row)"
            >
              儲存
            </el-button>
            <el-button
              v-if="editRow.id === row.id"
              type="warning"
              size="small"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </span>
          <span v-else>
            <el-button
              type="primary"
              size="small"
              :disabled="!!editRow.id"
              @click="handleEdit(row)"
            >
              編輯
            </el-button>
            <el-button v-if="row.status!='deleted'" size="small" type="danger" :disabled="!!editRow.id" @click="handleDelete(row)">
              刪除
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next, total"
      :total="pagination.total"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      @current-change="handleCurrentChange"
    />

    <create-shop-dialog-form :dialog-form-visible="createShopDialogFormVisible" @create="handleCreate" @cancel="closeCreate" />
  </div>
</template>

<script>
import { createShop, deleteShop, findShops, updateShop } from '@/api/shop'
import CreateShopDialogForm from './components/CreateShopDialogForm'

export default {
  components: { CreateShopDialogForm },
  data() {
    return {
      list: null,
      listLoading: true,
      editRow: { },
      createShopDialogFormVisible: false,
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  computed: {
    limit: function() {
      return this.pagination.pageSize
    },
    offset: function() {
      return (this.pagination.currentPage - 1) * this.limit
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      findShops({ limit: this.limit, offset: this.offset }).then(response => {
        this.list = response.items
        this.pagination.total = response.count
        this.listLoading = false
      })
    },
    handleEdit(row) {
      this.editRow = { ...row }
    },
    async confirmEdit(row) {
      await updateShop(row.id, row)
      this.editRow = {}
      await this.fetchData()
    },
    cancelEdit(row) {
      row.name = this.editRow.name
      row.address = this.editRow.address
      row.phone = this.editRow.phone
      row.personInCharge = this.editRow.personInCharge

      this.editRow = {}
    },
    handleDelete(row) {
      this.$confirm('確定刪除？', { confirmButtonText: '確定', cancelButtonText: '取消', customClass: 'confirm-delete-message-box', showClose: false })
        .then(async() => {
          await deleteShop(row.id)
          await this.fetchData()
        }).catch(_ => {})
    },
    async handleCreate(data) {
      this.closeCreate()
      await createShop(data)
      await this.fetchData()
    },
    closeCreate() {
      this.createShopDialogFormVisible = false
    },
    async handleCurrentChange() {
      await this.fetchData()
    }
  }
}
</script>

<style>
.confirm-delete-message-box {
  width: 200px;
}
</style>

<style scoped>
  .filter-container {
    padding-bottom: 10px;
  }
</style>
