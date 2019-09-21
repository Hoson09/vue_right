<template>
  <div class="tab-box">
    <Table
      :height="430"
      border
      ref="selection"
      :columns="columns4"
      :data="data4"
      @on-selection-change="selectCol4"
    ></Table>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import service from "../../service/index";
import EventBus from "../../eventBus";
export default {
  data() {
    return {
      selectItem: {},
      selectNum: 0,
      columns2: [],
      columns3: [],
      columns4: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "权限ID",
          width: 140,
          key: "id"
        },
        {
          title: "权限类型",
          width: 120,
          key: "type"
        },
        {
          title: "权限描述",
          key: "des"
        },
        {
          title: "提交时间",
          key: "subon"
        },
        {
          title: "提交人",
          width: 80,
          key: "subby"
        },
        {
          title: "权限父ID",
          width: 100,
          key: "pId"
        }
      ],
      columns5: [],
      data2: [],
      data3: [],
      data4: [],
      data5: []
    };
  },
  computed: {
    ...mapState(["buttonId", "currentPageNum", "tableObj", "tableCellNum"])
  },
  created() {
    this.initTable();
    EventBus.$on("refresh", () => {
      this.initTable(this.currentPageNum);
    });
    EventBus.$on("delete", () => {
      let itemID = parseInt(this.selectItem[0].id);
      // console.log(itemID);
      console.log(this.tableCellNum);
      let curPage = this.currentPageNum;
      if (this.tableCellNum % 10 == 1 && curPage != 1) {
        curPage = curPage - 1;
      }
      service
        .delRight(itemID)
        .then(() => {
          this.initTable(curPage);
        })
        .catch(() => {
          console.log("网络错误");
        });
    });
    EventBus.$on("changeTableView", data => {
      this.data4 = data;
    });
    EventBus.$on("pageChangeTable", data => {
      this.data4 = data;
    });
  },
  methods: {
    ...mapMutations([
      "selectOptionNum",
      "getTableObj",
      "setCurrentPage",
      "setTableCellNum"
    ]),
    initTable(page) {
      service
        .getRight(page)
        .then(res => {
          this.data4 = res.data;
          this.getTableObj(res.headers);
          this.setTableCellNum(res.headers["x-total-count"]);
          // console.log(this.tableObj["x-total-count"]);
          // console.log(res.headers["x-total-count"]);
        })
        .catch(() => {
          console.log("请求出错");
        });
    },
    selectCol4(selections) {
      this.selectNum = selections.length;
      this.selectItem = selections;
      console.log(this.selectItem);
      this.selectOptionNum(this.selectItem);
    }
  }
};
</script>
<style lang="scss" scoped>
.tab-box {
  flex: 1 1 460px;
  //lineheight可以控制table的行高
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-items: center;
  align-items: center;
  .ivu-table-wrapper {
    width: 100%;
  }
  .t {
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    margin: 200px auto;
    p {
      font-size: 60px;
      color: #000;
    }
  }
}
</style>
