<template>
    <div id="global-layout">
      <component :is="layout"/>
      <footer>
        <div style="text-align: center;">
            <a href="https://beian.miit.gov.cn/" target="_blank">备案号:浙ICP备2021001694号-2</a>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      layout () {
        if (this.$page.path) {
          if (this.$frontmatter.layout) {
            // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
            return this.$frontmatter.layout
          }
          return 'Layout'
        }
        return 'NotFound'
      }
    }
  }
  </script>