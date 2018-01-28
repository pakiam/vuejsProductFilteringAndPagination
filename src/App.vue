<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">

$medium-gutters: 20px;
$class-medium-slug: medium;

*{
  box-sizing: border-box;
}

body{
  background-color: #f1f1f1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.dib{
  display: inline-block;
}

.visuallyhidden{
  position: absolute;
	clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
	clip: rect(1px, 1px, 1px, 1px);
	padding: 0;
	border: 0;
	height: 1px;
	width: 1px;
	overflow: hidden;
}

.text-hint{
  font-weight: 400;
}

.ttu{
  text-transform: uppercase;
}

.wrapper{
  max-width: 1290px;
  margin-left: auto;
  margin-right: auto;
}

.row{
  display: flex;
  flex-flow: row wrap;
}

.row--no-gutters{
  margin-left: -$medium-gutters;
  margin-right: -$medium-gutters;
}

.columns{
  padding-left: $medium-gutters;
  padding-right: $medium-gutters;
}

@for $i from 1 through 12{
  .#{$class-medium-slug}-#{$i}{
    max-width: 100% / 12 * $i;
    flex: 0 0 100% / 12 * $i;
  }
}

</style>
