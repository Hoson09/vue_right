<template>
  <Page
    @on-change="pageChage"
    :current="1"
    :total="parseInt(tableObj['x-total-count'])"
    simple
  />
</template>
<script>
import service from "../../service/index";
import { mapState, mapMutations } from "vuex";
import EventBus from "../../eventBus";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["tableObj"])
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    pageChage(pageNum) {
      service
        .getRight(pageNum, 10)
        .then(res => {
          EventBus.$emit("pageChangeTable", res.data);
          this.setCurrentPage(pageNum);
        })
        .catch(() => {
          console.log("数据请求有误");
        });
    }
  }
};
</script>
