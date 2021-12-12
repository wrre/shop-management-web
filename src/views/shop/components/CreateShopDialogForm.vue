<template>
  <el-dialog title="建立店家" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :width="dialogWidth">
    <el-form ref="shopForm" class="create-form" :rules="rules" :model="shop" label-position="left" label-width="70px">
      <el-form-item label="名稱" prop="name">
        <el-input v-model="shop.name" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="shop.address" type="textarea" />
      </el-form-item>
      <el-form-item label="電話" prop="phone">
        <el-input v-model="shop.phone" />
      </el-form-item>
      <el-form-item label="負責人" prop="personInCharge">
        <el-input v-model="shop.personInCharge" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleCancel">
        取消
      </el-button>
      <el-button type="primary" size="small" @click="handleCreate">
        建立
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shop: {
        name: '',
        address: '',
        phone: '',
        personInCharge: ''
      },
      rules: {
        name: [{ required: true, message: '必填' }],
        address: [{ required: true, message: '必填' }],
        phone: [{ required: true, message: '必填' }],
        personInCharge: [{ required: true, message: '必填' }]
      },
      dialogWidth: '450px'
    }
  },
  mounted() {
    this.setDialogWidth()
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    handleCreate() {
      this.$refs['shopForm'].validate((valid) => {
        if (valid) {
          console.log('data:', this.shop)
          this.$emit('create', {...this.shop})
          this.$refs['shopForm'].resetFields()
        }
      })
    },
    handleCancel() {
      this.$refs['shopForm'].resetFields()
      this.$emit('cancel')
    },
    setDialogWidth() {
      const windowSize = document.body.clientWidth
      const defaultWidth = 450 // 預設寬度
      if (windowSize < defaultWidth) {
        this.dialogWidth = '100%'
      } else {
        this.dialogWidth = defaultWidth + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-form {
    width: 95%;
    max-width: 500px;
    margin-left:10px;
  }
</style>
