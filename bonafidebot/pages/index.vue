<template>
  <section class="container">
    <div>
      <h1 class="title">
        Roweromir 
      </h1>
      <form class="botform" @submit.prevent="sendMessage">
        <div class="botform__view">
          <div class="botform__messagebox botform__messagebox--bot">
            <div class="botform__message botform__message--bot">
              Cześć tu Roweromir :) Jak mogę Ci pomóc?
            </div>
            <br>
          </div>
          <!-- dynamic messages -->
          <transition-group name="fade">
            <div class="botform__messagebox" v-for="(message, i) in messages" :key="i" :class="{'botform__messagebox--bot': message.who == 'bot', 'botform__messagebox--user':message.who != 'bot'}">
              <div class="botform__message botform__message--bot" :class="{'botform__message--bot': message.who == 'bot', 'botform__message--user':message.who != 'bot'}">
                {{ message.text }}
              </div>
              <br>
            </div>
          </transition-group>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="message">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit">Wyślij</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/application/json';
export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {
    messages() {
      return this.$store.getters.getMessages
    }
  },
  components: {
  },
  methods: {
    sendMessage() {
      if (this.message) {
        this.$store.dispatch('addMessage', {
          who: 'user',
          text: this.message
        })
        axios.post('https://safe-caverns-94852.herokuapp.com/question', {q: this.message})
          .then((res) => {
            this.$store.dispatch('addMessage', {
              who: 'bot',
              text: res.data.ans
            })
            this.message = ''
            setTimeout(() => {
              let form = document.querySelector('.botform__view');
              form.scrollTop = form.scrollHeight + form.clientHeight;
            }, 100)
          })
          .catch(e => console.log(e))
        setTimeout(() => {
          let form = document.querySelector('.botform__view');
          form.scrollTop = form.scrollHeight + form.clientHeight;
        }, 100)
      } else {
        alert('Wpisz wiadomość')
      }
    }
  }
}
</script>

<style lang="scss">
$blue: #007bff;
$grey: #6c757d;
.botform {
  &__messagebox {
    &--user {
      text-align: right;
    }
  }
  &__message {
    display: inline-block;
    max-width: 360px;
    color: white;
    padding: .375rem .75rem;
    border-radius: .25rem;
    margin-bottom: 10px;
    &--bot {
      background: $blue;
    }
    &--user {
      background: $grey;
    }
  }
}
.botform__view {
  padding: .375rem .75rem;
  border: 1px solid #ced4da;
  font-size: 1rem;
  height: 300px;
  width: 500px;
  overflow: auto;
  margin-bottom: 20px;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
