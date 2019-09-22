<template>
  <div class="roletable">
    <Table
      border
      ref="selection"
      :columns="columns4"
      :data="data1"
      @on-selection-change="selectCol4"
    ></Table>
    <Page
      @on-change="pageChage"
      :current="1"
      :total="parseInt(itemNum)"
      :page-size="5"
      simple
    />
    <Button size="large" @click="handleSelectItem">关联</Button>
  </div>
</template>
<script>
import service from "../../service/index";
import { mapState, mapMutations } from "vuex";
import EventBus from "../../eventBus";
import axios from "axios";
import { Message } from "element-ui";

export default {
  name: "roletable",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "是否老师",
          key: "isTeacher"
        }
      ],
      data1: [],
      itemNum: "",
      selectionUserItems: []
    };
  },
  computed: {
    ...mapState(["selectItem", "user_permission"])
  },
  methods: {
    ...mapMutations(["pushUser_Permission"]),
    handleSelectItem() {
      let t = new Date();
      let y = t.getFullYear();
      let m =
        t.getMonth() + 1 > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1);
      let d = t.getDate() > 9 ? t.getDate() : "0" + t.getDate();
      let h = t.getHours() > 9 ? t.getHours() : "0" + t.getHours();
      let mm = t.getMinutes() > 9 ? t.getMinutes() : "0" + t.getMinutes();
      let s = t.getSeconds() > 9 ? t.getSeconds() : "0" + t.getSeconds();
      let subon = `${y + "-" + m + "-" + d} ${h + ":" + mm + ":" + s}`;
      console.log(subon);
      console.log("用户", this.selectionUserItems);
      console.log("权限", this.selectItem);
      // let tempArr = [];
      let linkData = {
        id: "",
        del: 0,
        subon: subon,
        permissionId: this.selectItem[0].id,
        userId: ""
      };
      if (this.user_permission.length != 0) {
        let arrUserPer = this.user_permission;
        console.log("arrUserPer:", arrUserPer);
        let isSelectObj = arrUserPer.find(
          item => item.permissionId == this.selectItem[0].id
        );
        let tempArray = [];
        if (isSelectObj) {
          arrUserPer.forEach(item => {
            if (item.permissionId == this.selectItem[0].id) {
              tempArray.push(item);
            }
          });
        }
        console.log("筛选出你选出的权限相关的数组~~~", tempArray);
        if (tempArray.length != 0) {
          let addAxiosArr = [];
          for (let i = 0; i < this.selectionUserItems.length; i++) {
            let isIndex = tempArray.findIndex(
              item => item.userId == this.selectionUserItems[i].id
            );
            if (!tempArray[isIndex]) {
              //这是遍历出尚未存在的用户权限关联。post提交
              linkData.userId = this.selectionUserItems[i].id;
              linkData.id = Date.now() + i;
              let linkDataCopy = Object.assign({}, linkData);
              console.log("linkDataxxx未存在需要提交:", linkDataCopy);
              //直接获取axios对象数组。
              let axiosObj = service.linkUser_permission(linkDataCopy);
              addAxiosArr.push(axiosObj);
            }
          }
          if (addAxiosArr.length != 0) {
            console.log(111);
            this.promiseAll(addAxiosArr);
          }
          let delAxiosArr = [];
          // let indexArray = [];
          for (let i = 0; i < tempArray.length; i++) {
            let isIndex = this.selectionUserItems.findIndex(
              item => item.id == tempArray[i].userId
            );
            console.log("isIndex:", isIndex);
            if (!this.selectionUserItems[isIndex] && tempArray.length != 0) {
              console.log(
                "linkDataxxx在提交的中的未存在需要删除",
                tempArray[i]
              );
              // 删除;
              // this.delUser_permission(tempArray[i].id, i);
              let delAxiosObj = service.delUser_permission(tempArray[i].id);
              delAxiosArr.push(delAxiosObj);
              // indexArray.push(i);

              //  删除成功后再在vuex上进行删除(如果是多个权限的删除，就要权限id和用户id都要相同才行)
              let index = this.user_permission.findIndex(
                item =>
                  item.userId == tempArray[i].userId &&
                  item.permissionId == tempArray[i].permissionId
              );
              this.user_permission.splice(index, 1);
              console.log("this.user_permission", this.user_permission);
            }
          }
          if (delAxiosArr.length != 0) {
            console.log(222);
            this.promiseDelAll(delAxiosArr);
          }
        } else {
          if (this.selectionUserItems.length != 0) {
            let addAxiosArr = [];
            for (let i = 0; i < this.selectionUserItems.length; i++) {
              linkData.userId = this.selectionUserItems[i].id;
              linkData.id = Date.now() + i;
              let linkDataCopy = Object.assign({}, linkData);
              console.log("linkDataxxx未存在需要提交:", linkDataCopy);
              // this.linkUser_permission(linkData);
              let axiosObj = service.linkUser_permission(linkDataCopy);
              addAxiosArr.push(axiosObj);
            }
            if (addAxiosArr.length != 0) {
              console.log(333);
              this.promiseAll(addAxiosArr);
            }
          } else {
            Message({
              showClose: true,
              message: "你的权限已无关联的用户",
              type: "warning"
            });
            this.$emit("closetable", false);
            this.$refs.selection.selectAll(false);
          }
        }
      } else {
        if (this.selectionUserItems.length != 0) {
          let addAxiosArr = [];
          for (let i = 0; i < this.selectionUserItems.length; i++) {
            //权限用户一对一。
            linkData.userId = this.selectionUserItems[i].id;
            linkData.id = Date.now() + i;
            let linkDataCopy = Object.assign({}, linkData);
            console.log("linkDataxxx未存在需要提交:", linkDataCopy);
            // this.linkUser_permission(linkData);
            let axiosObj = service.linkUser_permission(linkDataCopy);
            addAxiosArr.push(axiosObj);
          }
          if (addAxiosArr.length != 0) {
            console.log(444);
            this.promiseAll(addAxiosArr);
          }
        } else {
          Message({
            showClose: true,
            message: "你的权限已无关联的用户",
            type: "warning"
          });
          this.$emit("closetable", false);
          this.$refs.selection.selectAll(false);
        }
      }

      // for (let i = 0; i < this.selectionUserItems.length; i++) {
      //   tempArr.push(this.selectionUserItems[i].id);
      // }
      //这是一对多的情况，但是我们在以权限为标准搜索相对应的用户是可以的，但是我们要是以用户为标准来所搜相应的权限的话就不行了。
      // let linkData = {
      //   id: "",
      //   del: 0,
      //   subon: subon,
      //   permissionId: this.selectItem[0].id,
      //   userId: tempArr
      // };
      // console.log("参数:", linkData);
      // service
      //   .linkUser_permission(linkData)
      //   .then(res => {
      //     console.log("关联结果:", res.data);
      //     this.setUser_Permission({
      //       permissionId: res.data.permissionId,
      //       userId: res.data.userId
      //     });
      //     this.$emit("closetable", false);
      //     this.$refs.selection.selectAll(false);
      //   })
      //   .catch(() => {
      //     console.log("网络错误");
      //   });

      //判断这个权限id是否已经存在。
      // console.log(this.user_permission);
      // if (this.user_permission.length != 0) {
      //   let arrUserPer = this.user_permission;
      //   let itemIndex = arrUserPer.findIndex(
      //     item => item.permissionId == this.selectItem[0].id
      //   );
      //   console.log("itemindex:", itemIndex);
      //   if (arrUserPer[itemIndex]) {
      //     //如果权限id在服务器上已经存在那么只能进行修改。
      //     linkData.id = this.user_permission[itemIndex].id;
      //     //已经存在了所以要把vuex已有的数据进行替换。
      //     console.log("linkData已存在:", linkData);
      //     this.user_permission.splice(itemIndex, 1, linkData);
      //     //在服务器上进行替换
      //     this.putUser_permission(this.user_permission[itemIndex].id, linkData);
      //   } else {
      //     //如果这个权限不存在那么就可以进行增加权限。
      //     linkData.id = Date.now();
      //     console.log("linkData未存在:", linkData);
      //     this.linkUser_permission(linkData);
      //   }
      // } else {
      //   //如果完全没有关联任何权限的话可以直接增。
      //   linkData.id = Date.now();
      //   console.log("linkDataxxx未存在:", linkData);
      //   this.linkUser_permission(linkData);
      // }
    },
    promiseAll(dataArray) {
      //多个网络请求同时发送时，最好使用promise对象
      console.log("promisall");
      axios
        .all([...dataArray])
        .then(
          axios.spread((...num) => {
            console.log("PromiseNum:", num);
            for (let i = 0; i < num.length; i++) {
              console.log("pushUser_Per:", num[i].data);
              this.pushUser_Permission(num[i].data);
            }
            this.$emit("closetable", false);
            this.$refs.selection.selectAll(false);
          })
        )
        .catch(err => {
          console.log(err);
          console.log("权限人物关联添加失败");
        });
    },
    promiseDelAll(dataArray) {
      axios
        .all([...dataArray])
        .then(
          axios.spread(() => {
            console.log("删除权限用户关联成功");

            this.$emit("closetable", false);
            this.$refs.selection.selectAll(false);
          })
        )
        .catch(err => {
          console.log(err);
          console.log("关联权限人物关联删除失败");
        });
    },
    // linkUser_permission(linkData) {
    //   //增 这都是单一的网络情可以这样做
    //   service
    //     .linkUser_permission(linkData)
    //     .then(res => {
    //       console.log("关联结果:", res.data);
    //       this.pushUser_Permission(linkData);
    //       this.$emit("closetable", false);
    //       this.$refs.selection.selectAll(false);
    //     })
    //     .catch(() => {
    //       console.log("网络错误");
    //     });
    // },
    // putUser_permission(id, data) {
    //   //改，其实就是改和删是一个操作。
    //   service
    //     .putUser_permission(id, data)
    //     .then(() => {
    //       console.log("权限用户关联修改成功");
    //       this.$emit("closetable", false);
    //       this.$refs.selection.selectAll(false);
    //     })
    //     .catch(() => {
    //       console.log("权限用户关联的网络错误");
    //     });
    // },
    // delUser_permission(id, index) {
    //   //删除 这都是单一的网络情可以这样做
    //   service
    //     .delUser_permission(id)
    //     .then(() => {
    //       console.log("删除权限用户关联成功");
    //       //删除成功后再在vuex上进行删除
    //       this.user_permission.splice(index, 1);
    //       this.$emit("closetable", false);
    //       this.$refs.selection.selectAll(false);
    //     })
    //     .catch(() => {
    //       console.log("删除权限用户关联的网络错误");
    //     });
    // },
    pageChage(pageNum) {
      this.initRoleView(pageNum, 5);
    },
    selectCol4(selections) {
      console.log("选中的用户", selections);
      this.selectionUserItems = selections;
    },
    initRoleView(pageNum, size) {
      service
        .getUser(pageNum, size)
        .then(res => {
          // console.log("user:", res);
          this.data1 = res.data;
          this.itemNum = res.headers["x-total-count"];
          console.log("user_permission", this.user_permission, this.data1);
          if (this.user_permission.length != 0) {
            let isSelectObj = this.user_permission.find(
              item => item.permissionId == this.selectItem[0].id
            );
            let tempArray = [];
            if (isSelectObj) {
              this.user_permission.forEach(item => {
                if (item.permissionId == this.selectItem[0].id) {
                  tempArray.push(item);
                }
              });
            }
            console.log("筛选出你选出的权限相关的数组~~~", tempArray);

            if (tempArray.length != 0) {
              for (let i = 0; i < tempArray.length; i++) {
                let index = this.data1.findIndex(
                  item => item.id == tempArray[i].userId
                );
                console.log("index", index);
                this.data1[index]._checked = true;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          console.log("网络错误");
        });
    }
  },
  created() {
    console.log("roleView");
    this.initRoleView();
    // this.$nextTick(() => {
    //   // EventBus.$on("cleanTable", () => {
    //   //   this.$refs.selection.selectAll(false);
    //   // });
    //   if (this.user_permission.length != 0) {
    //     for (let i = 0; i < this.user_permission.length; i++) {
    //       let index = this.data1.findIndex(
    //         item => item.id == this.user_permission[i].userId
    //       );
    //       this.$refs.table.$refs.tbody.objData[index]._isChecked = true;
    //     }
    //   }
    // });
    // EventBus.$on("cleanTable", () => {
    //   this.$refs.selection.selectAll(false);
    // });
    // EventBus.$on("initRole", () => {
    //   this.initRoleView();
    // });
  },
  mounted() {
    EventBus.$on("cleanTable", () => {
      this.$refs.selection.selectAll(false);
    });
    EventBus.$on("initRole", () => {
      this.initRoleView();
    });
  }
};
</script>
<style scoped lang="scss">
.roletable {
  .ivu-page {
    margin: 20px auto 0;
  }
  .ivu-btn {
    margin-top: 20px;
    width: 200px;
  }
}
</style>
