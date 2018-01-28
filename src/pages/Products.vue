<template>
  <div class="products">
    <app-header @filterByCategory = "updateProducts"
                @initialFilter = "setCurrentFilter"
                @resetFilter = "resetProducts"
                :currentFilter="currentFilter"></app-header>
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
      <app-product v-for="product in getProductsPerPage" :product="product" :key="product.artnumber"></app-product>
      <div class="products__pagination">
        <router-link :to="{ name: 'Products', query: {page: n, brand: $route.query.brand} }"
                     v-for="n in Math.ceil(totalProducts / PER_PAGE)"
                     :key="n">{{ n }}
        </router-link>
      </div>
  </div>
</template>

<script>

import Header from '@/components/Products/Header'
import Product from '@/components/Products/Product'
export default {
  data () {
    return {
      products: [],
      totalProducts: 0,
      page: 1,
      PER_PAGE: 4,
      currentFilter: ''
    }
  },
  components: {
    appProduct: Product,
    appHeader: Header
  },
  methods: {
    setCurrentFilter (newVal) {
      this.currentFilter = newVal
    },
    /**
     * @param {Object}
     */
    routerPush (newQuery) {
      this.$router.push({name: 'Products', query: newQuery})
    },
    /**
    * Get value and filter products
    * @param value {String}
    */
    updateProducts (value) {
      this.products = this.$store.getters.products
      this.setCurrentFilter(value)

      this.products = this.products
        .filter(product => {
          return product.brand === value
        })

      if (this.availablePage < this.$route.query.page) {
        this.page = this.availablePage
      }
      this.routerPush({ page: this.page, brand: value })
      this.totalProducts = this.getProductsLength
    },
    resetProducts (newVal) {
      this.products = this.$store.getters.products
      this.setCurrentFilter(newVal)
      this.totalProducts = this.getProductsLength
      this.routerPush({ page: this.page })
    }
  },
  /**
   * Path with predifined queries
   */
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!(Object.keys(to.query).length === 0) && to.query.constructor === Object) {
        console.log(to.query)
        vm.page = to.query.page
        if (to.query.hasOwnProperty('brand')) {
          vm.updateProducts(to.query.brand)
        }
      }
    })
  },
  computed: {
    availablePage () {
      return Math.ceil(this.products.length / this.PER_PAGE)
    },
    getProductsPerPage () {
      let currentPage = this.$route.query.page || this.page
      return this.products.slice((currentPage - 1) * this.PER_PAGE, currentPage * this.PER_PAGE)
    },
    getProductsLength () {
      return this.products.length
    }
  },
  /**
   * Init info for component
   */
  created () {
    this.totalProducts = this.$store.getters.productsLength
    this.products = this.$store.getters.products
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
