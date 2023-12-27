<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar w/ text</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
        <span class="navbar-text">
          Navbar text with an inline element
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default{
  methods:{
    // bug logout 有被觸發，但是if 內的判斷沒有觸發跟this.user有關係嗎？
    logout(){
      console.log('logout')
      const api = `${process.env.VUE_APP_API}logout`;
      console.log(this.user);
        this.$http.post(api ,this.user)
        .then((res)=>{
          // 如果的登入成功的狀態，就執行
          if(res.data.success){
            console.log(res);
              //轉址到login頁面
            this.$router.push('/login');
          }
        })
    },
  }
}
</script>