<template>
  <div class="fromcontentview">
    <el-form
      label-position="right"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="权限ID">
        <el-input v-model="ruleForm.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择权限类型">
          <el-option label="menu" value="menu"></el-option>
          <el-option label="route" value="route"></el-option>
          <el-option label="resource" value="resource"></el-option>
          <el-option label="data" value="data"></el-option>
          <el-option label="component" value="component"></el-option>
          <el-option label="file" value="file"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item :label="isDel" prop="del">
        <el-switch v-model="ruleForm.del"></el-switch>
      </el-form-item>
      <el-form-item label="权限状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="启用"></el-radio>
          <el-radio label="禁用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限描述" prop="des">
        <el-input type="textarea" v-model="ruleForm.des"></el-input>
      </el-form-item>
      <el-form-item label="提交人" prop="subby">
        <el-input v-model="ruleForm.subby"></el-input>
      </el-form-item>
      <el-form-item label="权限码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="权限地址" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="权限父ID" prop="pId">
        <el-input type="number" v-model="ruleForm.pId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          commitTitle
        }}</el-button>
        <template v-if="dialogtype == 'addOptions'">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message } from "element-ui";
import service from "../../service/index";
import EventBus from "../../eventBus";
import { mapState, mapMutations } from "vuex";
export default {
  name: "fromcontentview",
  data() {
    return {
      commitTitle: "",
      ruleForm: {
        date1: "",
        date2: "",
        subby: "",
        code: "",
        url: "",
        pId: "",
        id: "",
        type: "",
        del: false,
        status: "",
        des: ""
      },
      rules: {
        subby: [
          { required: true, message: "请输入提交人姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请输入权限类型", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        status: [
          { required: true, message: "请选择权限状态", trigger: "change" }
        ],
        des: [
          {
            required: true,
            message: "请填具体描述你所设定的权限",
            trigger: "blur"
          }
        ],
        pId: [
          {
            required: true,
            message: "请输入数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["dialogtype", "selectItem", "tableObj"]),
    isDel() {
      if (this.ruleForm.del) {
        return "删除";
      } else {
        return "不删除";
      }
    },
    getDate() {
      let y = this.ruleForm.date1.getFullYear();
      let m =
        this.ruleForm.date1.getMonth() + 1 > 9
          ? this.ruleForm.date1.getMonth() + 1
          : "0" + (this.ruleForm.date1.getMonth() + 1);
      let d =
        this.ruleForm.date1.getDate() > 9
          ? this.ruleForm.date1.getDate()
          : "0" + this.ruleForm.date1.getDate();
      let h =
        this.ruleForm.date2.getHours() > 9
          ? this.ruleForm.date2.getHours()
          : "0" + this.ruleForm.date2.getHours();
      let min =
        this.ruleForm.date2.getMinutes() > 9
          ? this.ruleForm.date2.getMinutes()
          : "0" + this.ruleForm.date2.getMinutes();
      let s =
        this.ruleForm.date2.getSeconds() > 9
          ? this.ruleForm.date2.getSeconds()
          : "0" + this.ruleForm.date2.getSeconds();
      let date = y + "-" + m + "-" + d;
      let time = h + ":" + min + ":" + s;
      return `${date} ${time}`;
    }
  },
  created() {
    this.ruleForm.id = Date.now();
    EventBus.$on("createID", () => {
      this.initFrom();
      this.ruleForm.id = Date.now();
      this.commitTitle = "添加提交";
      // console.log("222");
    });
    EventBus.$on("edit", () => {
      this.initFrom();
      this.editFrom();
    });
    this.editFromInit();
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    initFrom() {
      for (let k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.ruleForm.del = false;
    },
    editFrom() {
      console.log(this.selectItem);
      this.commitTitle = "编辑提交";
      for (let k in this.selectItem[0]) {
        this.ruleForm[k] = this.selectItem[0][k];
      }
      let t = new Date(this.selectItem[0].subon);
      this.ruleForm.date1 = t;
      this.ruleForm.date2 = t;
      this.ruleForm.del = this.selectItem[0].del ? true : false;
      console.log("this.selectItem[0].status", this.selectItem[0].status);
      this.ruleForm.status = this.selectItem[0].status ? "禁用" : "启用";
    },
    editFromInit() {
      // console.log("edit:", this.dialogtype);
      if (this.dialogtype == "editOptions") {
        this.editFrom();
      } else {
        this.commitTitle = "添加提交";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let rightPostData = {
            id: this.ruleForm.id,
            del: this.ruleForm.del ? 1 : 0,
            type: this.ruleForm.type,
            des: this.ruleForm.des,
            status: this.ruleForm.status == "启用" ? 0 : 1,
            subon: this.getDate,
            subby: this.ruleForm.subby,
            code: this.ruleForm.code,
            url: this.ruleForm.url,
            pId: this.ruleForm.pId
          };
          if (this.dialogtype == "editOptions") {
            service
              .changeRight(rightPostData.id, rightPostData)
              .then(res => {
                console.log("changRight res.data", res.data);
                Message({
                  showClose: true,
                  message: "修改权限成功",
                  type: "success"
                });
                this.$emit("closedialog", false);
                this.$refs[formName].resetFields();
              })
              .catch(() => {
                Message({
                  showClose: true,
                  message: "网络请求错误",
                  type: "error"
                });
              });
          } else {
            service
              .addRight(rightPostData)
              .then(res => {
                console.log("addRight res.data", res.data);
                Message({
                  showClose: true,
                  message: "添加权限成功",
                  type: "success"
                });
                this.$emit("closedialog", false);
                this.$refs[formName].resetFields();
              })
              .catch(() => {
                Message({
                  showClose: true,
                  message: "网络请求错误",
                  type: "error"
                });
              });
          }
        } else {
          Message({
            showClose: true,
            message: "请完善表格",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped lang="scss">
.fromcontentview {
  text-align: left;
}
</style>
