<template>
<!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">

        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile">
              </div>
              <img class="img-fluid" alt="">
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5">
                <div class="mb-3 input-group" >
                  <input type="url" class="form-control form-control"
                          placeholder="請輸入連結" >
                  <button type="button" class="btn btn-outline-danger">
                    移除
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用 
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product',tempProduct)">確認</button>
        </div>

      </div>
    </div>
  </div>

  <!--
點擊右上角，彈出視窗，輸入內容按下確認，將資料新增上去。
列表products元件
彈跳視窗productModal元件
在列表新增tempProduct空物件，將他透過props傳送給productModal，pM接受後，會將之儲存起來
資料完成後，pM會將資料透過$emit事件送到外層。接著外層會觸發updateProduct事件，uP這個事件會將準備好的資料傳送給遠端
透過v-model綁定資料
在pM-data新增tempProduct來接收外層的資料
在Product頁面，updateProduct(item)會把pM傳過來的資料當做參數，儲存起來並發送到遠端
props的product 是外層的tempproduct

  -->
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
//tempProduct會接收外層Products props傳進來的資料
export default {
  props:{
    product:{
      type:Object,
      default() { return {}; },
    },
  },
  //因為單向數據流，不能直接修改外界傳來的值，所以才要監聽外層傳進來的props，並將他賦予到自己的data裡面
  watch:{
    product(){
      this.tempProduct = this.product;
    }
  },
  data() {
    return {
      modal:{},
      tempProduct:{},
    };
  },
  methods:{
    showModal(){
      this.modal.show();
    },
    hideModal(){
      this.modal.hide();
    },
    uploadFile(){
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload',uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
      .then((res)=>{
        // bug 打不開照片的網址
        console.log(res.data);
        // if(res.data.success){
        //   this.tempProduct.imgUrl = res.data.imgUrl;
        // }
      })
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
}

//在ProductModal.vue 引入Bootstrap Modal樣式
//在mounted 將modal 實體化ref
// 外層元件Product 呼叫ProductModal 可以透過這些事件

/*
// note 透過 API 上傳圖片

// API 格式較特殊，需要使用傳統的 form 標籤進行上傳。
// action: API 路徑，使用 form-data，使用 POST 方法。

// input 的 name 是上傳 API 需要對應的欄位。
// 上傳圖片會觸發 change 事件，呼叫 uploadFile 函式。

// 取得檔案：透過在 input 加上 ref 取得檔案。
// 宣告 uploadedFile 來接收 refs.fileInput，使用 dir 可以找到 files 陣列。
// files[0] 就是要上傳的檔案。

const formData = new FormData(); // JavaScript 方法用來建立 form-data 格式的內容。

// 轉成 form-data：append() 是用來增加一個欄位到表單裡面。
// 裡面帶上 API 文件要求的 name。
formData.append('file', files[0]);

// 透過 API 將資料發送到遠端。
// 這樣就完成了圖片的上傳過程。
*/
</script>
