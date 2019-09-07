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
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["tableObj"])
  },
  methods: {
    pageChage(pageNum) {
      service
        .getRight(pageNum, 10)
        .then(() => {})
        .catch(() => {
          console.log("数据请求有误");
        });
    }
  }
};
</script>
