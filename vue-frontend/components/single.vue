<template>
  <div>
    <h2>{{ add.id }} {{ add.title }}</h2>
    <p>{{ add.text }}</p>
    <p>
       
        <v-img
          :src="`https://picsum.photos/1137?image=${(add.id%30)*4}`"
          aspect-ratio="1.3333"
        ></v-img>
    </p>
  </div>
</template>
<script>
  export default {
      data () {
          return {
            add: {}
          }
      },
      mounted() {
          var app = this;
          axios.get('/add/' + app.$attrs.id)
              .then(function (resp) {
                  app.add = resp.data;
              })
              .catch(function (resp) {
                  console.log(resp);
                  alert("Could not load adds");
              });
      }
  }
</script>