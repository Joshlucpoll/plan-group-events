<script lang="ts">
</script>

<div class="container">
  <p>when's it happening?</p>
  <input placeholder="name" />
  <p><em>optional</em>: tell people where it's happening</p>
  <input placeholder="location" />

  <div class="step-nav">
    <div class="pge-btn">
      <div class="btn-text">back</div>
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
    transform: scale(0.7) translateY(50%);
    filter: blur(2px);
    opacity: 0.8;
    z-index: 9;
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
    justify-content: start;
  }
</style>
