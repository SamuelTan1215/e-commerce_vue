<template>
  <Navbar></Navbar>
  <div class="container-fluid">
    <!--這裡的rw呈現的是Products.vue的畫面？感覺會像是在父層放的rw會是子層的畫面-->
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default{
  components:{
    Navbar
  },
  created(){
    // bug Login.vue 登入失敗 所以尚未取得cookie
    //透過正則表達式取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log(token);
    //將token 夾帶到headers 的Authorization
    // bug 14行為何要帶上${}
    this.$http.defaults.headers.common.Authorization = `${token}`;
    // 檢查用戶是否仍持續登入
    const api = `${process.env.VUE_APP_API}api/user/check`;
      this.$http.post(api ,this.user)
      .then((res)=>{
        // 如果token 過期 或是 非登入狀態就會執行跳轉頁面到login
        // if(!res.data.success){
        //   this.$router.push('/login');
        // }
      })
  }
};
</script>