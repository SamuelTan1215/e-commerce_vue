<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openModal(true)">增加一個產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-right">
          {{item.origin_price}}
        </td>
        <td class="text-right">
          {{item.price}}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"/>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue';

export default{
  data(){
    return {
      products:[],
      pagination:{},
      tempProduct:{},
      isNew:false,
      isLoading:false,
    }
  },
  components:{
    ProductModal,
    DelModal,
  },
  // 取得產品列表（產品資訊，分頁）
    // bug loadingPlugin沒有成功展現效果
  methods:{
    getProducts(){
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.isLoading = true;
      this.$http.get(api)
      .then((res)=>{
        this.isLoading = false;
        if(res.data.success){
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      })
    },
    //清空，然後展開product.component
    //參數1是確認他是不是新的，參數2是在如果確定是編輯的狀態就將他加進來
    openModal(isNew,item){
      if(isNew){
        this.tempProduct = {};
      }else{
        this.tempProduct = {...item};
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item){
      this.tempProduct = item;
      //新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      const productComponent = this.$refs.productModal;
      let httpMethod = 'post';

      //編輯
      if(!this.isNew){
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api,{data:this.tempProduct})
      .then((response)=>{
        productComponent.hideModal();
        this.getProducts();
      })
    },
    // 開啟刪除 Modal
    openDelProductModal(item) {
    this.tempProduct = { ...item };
    const delComponent = this.$refs.delModal;
    delComponent.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((response) => {
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });
    },
  },
  created(){
    this.getProducts();
  }
}
</script>