<template>
  <div>

    <v-container grid-list-md>
        <v-layout row wrap align-space-around>
            <v-flex xs12 lg3 lg v-for="(add, index) in adds" :key="add.id">

                <v-card height="100%"> 

                    <v-img
                      :src="`https://picsum.photos/500/300?image=${(add.id%30)*4}`"
                      aspect-ratio="1.3333"
                    ></v-img>
                    <!--div class="text-xs-center"><v-icon size=256>image</v-icon></div-->
                    
                  
                    <v-card-title primary-title>
                      <div>
                        <h4><router-link tag="a" :to="{ name: 'single', params: { slug: add.id, id: add.id }}">
                          {{ add.id }} {{ add.title }}
                        </router-link></h4>
                        <p>{{ textStrip(add.text) }}</p>
                      </div>
                    </v-card-title>

                    <!--v-card-actions>
                      <v-btn flat color="orange" :to="{ name: 'single', params: { slug: add.id, id: add.id }}">DETAILS</v-btn>
                      <v-btn flat color="orange" v-on:click="deleteEntry(add.id, index)">delete</v-btn>
                    </v-card-actions-->

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>

    <infinite-loading spinner="spiral" @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
  </div>
</template>

<script>
    export default {
        data: function () {
            return {
            	page: 2,
                adds: []
            }
        },
        props: ['newAdd'],
        watch: {
            newAdd: function(newVal, oldVal) { 
              this.adds.unshift(newVal);
              // remove last element to avoid duplicates because it will get fetched by infinite loader 
              this.adds.pop(); 
            }
        },
        mounted() {
            var app = this;
            axios.get('/adds')
                .then(function (resp) {
                    app.adds = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load adds");
                });
        },
        methods: {
            textStrip (text) {
                if (!text)
                  return "";
                var limit = 100;
                return text.length > limit ? text.substring(0, limit) + '...' : text;
            },
            deleteEntry(id, index) {
                if (confirm("Do you really want to delete it?")) {
                    var app = this;
                    axios.delete('/adds/' + id)
                        .then(function (resp) {
                            app.adds.splice(index, 1);
                        })
                        .catch(function (resp) {
                            alert("Could not delete add");
                        });
                }
            },
            infiniteHandler($state) {
		        axios.get('/adds', {
		            params: {
		                page: this.page,
		            },
		        }).then(({ data }) => {
		          if (data.length) {
		              this.page += 1;
                      //this.adds.push(...data);
                      data.forEach(function (item, index) {
                        this.adds.push(item);
                        /*
                        if (this.adds.find(function(element) {
                            return element < 12;
                            })) {
                            this.adds.push(item);
                        }*/
                      }, this);
		              $state.loaded();
		          } else {
		              $state.complete();
		          }
		      });
		    }
        }
    }
</script>
