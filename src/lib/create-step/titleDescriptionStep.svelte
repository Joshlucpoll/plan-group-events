<script lang="ts">
</script>

<div class="container">
  <p>the big event! what's it called?</p>
  <input placeholder="title" />
  <p>
    <em>optional</em>: add a bit more info, so people know what it's all about
  </p>
  <input placeholder="description" />

  <div class="step-nav">
    <div class="pge-btn">
      <div class="btn-text">back</div>
    </div>
    <div class="pge-btn">
      <div class="btn-text">next</div>
    </div>
  </div>
</div>

<style>
  .container {
    background-color: white;
    border: solid 4px black;
    border-radius: 1.5rem;
    padding: 2rem;
    box-sizing: border-box;
    width: min(calc(100vw - 2rem), calc(1024px - 2rem));

    position: absolute;
    z-index: 10;
  }

  p {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
  }

  p:nth-child(1) {
    margin-top: 0;
  }

  input {
    padding: 0.7rem 1.5rem;
    border: solid 2px black;
    border-radius: 2rem;
    max-width: min(400px, 50vw);
    width: 100%;
  }

  .step-nav {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
