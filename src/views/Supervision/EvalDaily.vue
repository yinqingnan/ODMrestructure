<template>
  <div>
    <h2>EvalDaily</h2>
    <div style="height:400px">
      <vxe-table show-overflow height="auto" row-id="id" :loading="loading" :data="tableData">
        <vxe-table-column type="checkbox" width="60" />
        <vxe-table-column type="seq" title="序号" width="60" />
        <vxe-table-column field="name" title="Name" sortable />
        <vxe-table-column field="sex" title="Sex" />
        <vxe-table-column field="age" title="Age" />
      </vxe-table>
      <vxe-pager
        :loading="loading"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="pagerchange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  components: {},
})
export default class EvalDaily extends Vue {
  public loading = false
  public tableData = [
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_124", sex: "男", age: 32 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
    { name: "test_190", sex: "女", age: 22 },
    { name: "name_66", sex: "男", age: 26 },
    { name: "name_77", sex: "男", age: 28 },
    { name: "name_17", sex: "女", age: 23 },
  ]
  public tablePage = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500],
    layouts: [
      "Sizes",
      "PrevJump",
      "PrevPage",
      "Number",
      "NextPage",
      "NextJump",
      "FullJump",
      "Total",
    ],
    perfect: true,
  }
  page = {
    currentPage: 1,
    pageSize: 15,
    totalResult: 200,
  }
  public tableColumn = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 50 },
    { field: "name", title: "Name" },
    { field: "nickname", title: "Nickname" },
    { field: "role", title: "Role" },
    { field: "describe", title: "Describe", showOverflow: true },
  ]
  public mounted() {
    this.findList()
  }
  public findList() {
    // 模拟后台接口
    this.tablePage.total = setTimeout(() => {
      this.tablePage.total = this.tableData.length
      this.loading = false
    }, 200)
  }
  public handlePageChange({ currentPage, pageSize }) {
    // this.tablePage.currentPage = currentPage
    // this.tablePage.pageSize = pageSize
    this.fanye()
  }
  searchEvent() {
    this.tablePage.currentPage = 1
    this.findList()
  }
  fanye() {
    this.tableData = this.pagingData.slice(
      (this.page.currentPage - 1) * this.page.pageSize,
      this.page.currentPage * this.page.pageSize
    )
  }
  pagerchange() {
    this.fanye()
  }
}
</script>

<style lang="less" scope></style>
