<template>
  <div class="products">
    <app-header @filterByCategory="updateProducts"></app-header>
    <div class="row">
      <div class="medium-12">
        <div class="products__total">{{ totalProducts }} товаров</div>
      </div>
    </div>
      <div class="row products__titles ">
        <div class="medium-1 columns">
          Артикул
        </div>
        <div class="medium-4 columns">
          Название товара
        </div>
        <div class="medium-2 columns">
          Бренд
        </div>
        <div class="medium-1 columns">
          Вес
        </div>
        <div class="medium-1 columns">
          Фасовка
        </div>
        <div class="medium-2 columns">
          Цена
          <div class="text-hint">с учетом персональной скидки</div>
        </div>
        <div class="medium-1 columns">
          Наличие
        </div>
      </div>
      <app-product v-for="product in products" :product="product" :key="product.artnumber"></app-product>
      <div class="products__pagination">
        <router-link :to="{ name: 'Products', query: {page: n} }" v-for="n in Math.ceil(totalProducts / 4)" :key="n">{{ n }}</router-link>
      </div>
  </div>
</template>

<script>

import Header from './Header'
import Product from './Product'
const PER_PAGE = 4
export default {
  data () {
    return {
      products: [],
      totalProducts: 0,
      filteredProducts: [],
      storeProducts: []
    }
  },
  components: {
    appProduct: Product,
    appHeader: Header
  },
  methods: {
    updateProducts (products) {
      this.filteredProducts = products
      this.products = this.filteredProducts.slice((this.$route.query.page - 1) * PER_PAGE, this.$route.query.page * PER_PAGE)
      if (Math.ceil(this.filteredProducts.length / PER_PAGE) < this.$route.query.page) {
        let lastAvailablePage = Math.ceil(this.filteredProducts.length / PER_PAGE)
        this.$router.push({path: '/products', query: { page: lastAvailablePage }})
      }
      this.totalProducts = this.filteredProducts.length
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.products =
      this.filteredProducts.length
      ? this.filteredProducts.slice((to.query.page - 1) * PER_PAGE, to.query.page * PER_PAGE)
      : this.storeProducts.slice((to.query.page - 1) * PER_PAGE, to.query.page * PER_PAGE)
    next()
  },
  computed: {
    // totalProducts () {
    //   return this.products.length
    // }
  },
  created () {
    this.totalProducts = this.$store.getters.products.length
    this.storeProducts = this.$store.getters.products
    this.products = this.storeProducts.slice((this.$route.query.page - 1) * PER_PAGE, this.$route.query.page * PER_PAGE)
  }
}
</script>

<style lang="scss">
.products{
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
}
.products__total{
  text-transform: uppercase;
  color: #b9b9b9;
  margin-bottom: 40px;
}
.products__titles{
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 25px;
}
</style>
