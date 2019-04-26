<template>
  <div class="footer">
    <p class="friendly-links">
        关于我 :
        <a href="http://www.just.edu.cn/" target="_blank">江苏科技大学</a>
        <span></span>
        <a href="http://szlg.just.edu.cn/" target="_blank">江苏科技大学苏州理工学院</a>
        <span></span>
        友情链接 :
        <a href="http://www.zjg.gov.cn/index.html" target="_blank">中国张家港</a>
        <span></span>
        <a href="https://github.com/KennyJian?tab=repositories" data-query="utm_source=wwwmaoyan" target="_blank">个人GitHub</a>
        <span></span>
        <a href="https://www.jianshu.com/u/d21c3696a10e" data-query="utm_source=wwwmaoyan" target="_blank">个人博客</a>
        <span></span>
    </p>
    <p class="friendly-links">
      商务合作邮箱：13424312860@163.com
      客服电话：13424312860
      违法和不良信息举报电话：4006018900
      <br/>
      投诉举报邮箱：13424312860@163.com
      舞弊线索举报邮箱：13424312860@163.com
    </p>
    <p>
        &copy;2016
        江科大电影 www.chong10010.cn
<!--        <a href="https://tsm.miit.gov.cn/pages/EnterpriseSearchList_Portal.aspx?type=0&keyword=京ICP证160733号&pageNo=1" target="_blank">京ICP证160733号</a>-->
<!--        <a href="http://www.miibeian.gov.cn" target="_blank">京ICP备16022489号-1</a>-->
<!--        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010102003232" target="_blank">京公网安备 11010102003232号</a>-->
        <a href="/about/licence" target="_blank">网络文化经营许可证</a>
        <a href="http://www.meituan.com/about/rules" target="_blank">电子公告服务规则</a>
    </p>
    <p>余中键个人毕业设计</p>
</div>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style lang="">
  .footer {
    /* width: 100%; */
  background-color: #262426;
  padding: 56px 0;
  margin: 82px auto 0;
  min-width: 1200px;
}
.footer p {
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
}
.footer p,
.footer p a {
  color: #666;
}
.footer .friendly-links a {
  color: #ef4238;
}
.footer .friendly-links a:hover {
  text-decoration: underline;
}
.friendly-links span {
  display: inline-block;
  border-left: 1px solid #444;
  margin: 0 7px;
  height: 12px;
  position: relative;
  top: 1px;
}
</style>
