<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>Vuegram</h1>
        <p>Welcome to Vuejs</p>
      </div>
      <div class="col2">
        <form>
          <h1>Welcome Back</h1>

          <label for="email1">Email</label>
          <input type="text" placeholder="you@email.com" id="email1" />

          <label for="password1">Password</label>
          <input type="password" placeholder="******" id="password1" />

          <button class="button">Log In</button>

          <div class="extras">
            <a>Forgot Password</a>
            <a>Create an Account</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>