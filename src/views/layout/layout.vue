<template>
    <div class="layout">
        <div class="header">云书后台管理系统</div>
        <div class="side_bar"></div>
        <div class="content"></div>
    </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.header {
    height: 80px;
    border: 1px solid #bbbbbd;
    text-align: center;
    line-height: 80px;
    margin-left: 200px;
    font-size: 26px;
    font-weight: 700;
    background-color: #CEA088;
}
.side_bar {
    height: 100vh;
    width: 200px;
    background-color: #26293a;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
}
</style>
