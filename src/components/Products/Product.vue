<template>
  <div class="products__product product row">
      <div class="product__artnumber medium-1 columns">
          {{ product.artnumber }}
      </div>
      <div class="product__name medium-4 columns">
        {{ product.name }}
      </div>
      <div class="product__brand medium-2 columns">
        {{ product.brand }}
      </div>
      <div class="product__weight medium-1 columns">
        {{ product.weight }} кг
      </div>
      <div class="product__quantity medium-1 columns">
        {{ product.quantity }} шт
      </div>
      <div class="product__price medium-2 columns">
        {{ product.price }} рублей
      </div>
      <div class="product__stock medium-1 columns">
        {{ product.stock == 1 ? 'есть' : 'нет' }}
      </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.product{
  flex: 0 0 100%;
  max-width: 100%;
  display: flex;
  padding-top: 25px;
  padding-bottom: 25px;
  &:hover{
    background-color: #f1f1f1;
  }
}
</style>

