<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        bonafidebot
      </h1>
      <form class="botform">
        <div class="botform__view">
          <div class="botform__messagebox botform__messagebox--bot">
            <div class="botform__message botform__message--bot">
              Hej :) jak mogę Ci pomóc?
            </div>
            <br>
          </div>
          <div class="botform__messagebox botform__messagebox--user">
            <div class="botform__message botform__message--user">
              Zepsuł mi się rower :(
            </div>
            <br>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  components: {
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
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
