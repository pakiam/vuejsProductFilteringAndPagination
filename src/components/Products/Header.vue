<template>
  <div class="products__header">
      <div class="row">
          <div class="medium-2"><span class="ttu">Фильтры</span></div>
          <div class="medium-8">
              Бренды:
              <button class="custom-select dib">
                  <div class="custom-select__current">
                      {{currentFilter}}
                  </div>
                  <div class="custom-select__options visuallyhidden">
                      <div class="custom-select__option" @click="filterProducts">Petcurean</div>
                      <div class="custom-select__option" @click="filterProducts">Felix</div>
                      <div class="custom-select__option" @click="filterProducts">Sheba</div>
                  </div>
              </button>
            </div>
          <div class="medium-2" ><button class="products__reset-filter" @click="resetFilter">Сбросить фильтр</button></div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    currentFilter: {
      default () {
        return this.initialState
      }
    }
  },
  data () {
    return {
      initialState: 'показать все'
    }
  },
  methods: {
    ...mapGetters({
      getProducts: 'products'
    }),
    filterProducts (event) {
      let value = event.currentTarget.innerText
      this.$emit('filterByCategory', value)
    },
    resetFilter () {
      this.currentFilter = 'показать все'
      this.$emit('resetFilter', this.initialState)
    }
  },
  mounted () {
    this.$emit('initialFilter', this.initialState)
  }
}
</script>

<style lang="scss">
.products__header {
  padding-top: 22px;
  padding-bottom: 22px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
  font-weight: bold;
}
.products__reset-filter{
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #000;
  padding-left: 0;
  padding-right: 0;
  cursor: pointer;
  &:hover{
    border-color: transparent;
  }
}
.custom-select {
  position: relative;
  background-color: transparent;
  min-width: 80px;
  text-align: left;
  border: none;
  &:focus {
    .custom-select__options {
      width: auto;
      height: auto;
      clip: auto;
      opacity: 1;
    }
  }
}
.custom-select__options {
  top: 100%;
  left: 0;
  opacity: 0;
  right: 0;
  text-align: left;
  padding-top: 10px;
  transition: all 0.3s ease-in-out;
}
.custom-select__option{
  padding-left: 6px;
  padding-right: 6px;
}
</style>
