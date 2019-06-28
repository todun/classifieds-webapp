<template>
  <div>
    <v-form>
      <v-container>
        <v-layout row wrap align-space-around hidden-lg-and-up>
          <v-flex xs12 sm3 d-flex v-for="(cat, index) in cat_list" :key="index">
            <v-select :items="catnames(cat)" v-model="cat.selected" @change="catChange(cat, index)" label="Category"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-space-around hidden-md-and-down>
          <v-flex xs2 d-flex v-for="(cat, index) in cat_list" :key="index">
            <v-radio-group v-model="cat.selected" @change="catChange(cat, index)">
              <v-radio
                v-for="(item, index2) in cat"
                :key="index2"
                :label="item.name"
                :value="item.name"
              ></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-space-around>
          <v-flex xs12 md9><v-text-field v-model="add.title" v-bind:error-messages="errors.title" label="Title"></v-text-field></v-flex>
          <v-flex xs12 md3><v-text-field v-model="add.price" v-bind:error-messages="errors.price" label="Price" prepend-icon="attach_money"></v-text-field></v-flex>
          <v-flex xs12 md9><v-text-field v-model="add.email" v-bind:error-messages="errors.email" label="E-mail"></v-text-field></v-flex>
          <v-flex xs12 md3><v-text-field v-model="add.phone" v-bind:error-messages="errors.phone" label="Phone"></v-text-field></v-flex>
          <v-flex xs12><v-text-field v-model="add.address" v-bind:error-messages="errors.address" label="Address"></v-text-field></v-flex>
          <v-flex xs12><v-textarea v-model="add.text" name="add.text" v-bind:error-messages="errors.text" label="Text" hint="Classified text"></v-textarea></v-flex>
        </v-layout>
      </v-container>
      <v-btn @click.stop.prevent="saveForm()">submit</v-btn>
    </v-form>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                add: {},
                errors: {},
                cat_all: common.add_categories,
                cat_list: [common.add_categories],
            }
        },
        methods: {
          catChange: function(cat, index) {
            var selectedVal = this.cat_list[index].selected;
            if (selectedVal && 
                (!(index + 1 in this.cat_list) || selectedVal != this.cat_list[index + 1].name))
            {
              this.cat_list = this.cat_list.slice(0, index + 1);
              var selectedCat = this.cat_list[index].filter(obj => {
                return obj.name === selectedVal;
              });
              if (selectedCat[0].sub && selectedCat[0].sub.length > 0)
              {
                selectedCat[0].sub.selected = "";
                this.cat_list.push(selectedCat[0].sub);
              }
            }
          },
          catnames: function(cat) {
            var names = cat.map(function(item) {
              return item['name'];
            });
            return names;
          },
          saveForm() {
              event.preventDefault();
              var app = this;
              var params = {};
              params.add = app.add;
              params.cat_list = app.cat_list;
              axios.post('/create', params)
                  .then(function (resp) {
                      app.$router.push({ name: 'root', params: { newAdd: resp.data } });
                      //app.$router.go(-1);
                  })
                  .catch(function (resp) {
                      if (resp.response.data.name == "SequelizeValidationError")
                      {
                        resp.response.data.errors.forEach(function(err) {
                          app.errors[err.path] = err.message;
                          app.errors = Object.assign({}, app.errors);
                        });
                      }
                  });
          }
        }
    }
</script>