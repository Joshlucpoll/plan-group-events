<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let stepIndex;

  const dispatch = createEventDispatcher();

  let containerStyle =
    "transform: scale(0.666) translateY(50%); filter: blur(2px); opacity: 0.5; z-index: 8";

  $: {
    if (stepIndex >= 2) {
      containerStyle =
        "transform: scale(1) translateY(0); filter: blur(0px); opacity: 1; z-index: 10";
    } else if (stepIndex <= 1) {
      containerStyle = `transform: scale(${
        stepIndex * 0.666
      }) translateY(80%); filter: blur(2px); opacity: 0.5; z-index: 8`;
    } else {
      containerStyle = `transform: scale(${
        0.666 + (stepIndex - 1) / 3
      }) translateY(${80 - (stepIndex - 1) * 80}%); filter: blur(${
        2 - (stepIndex - 1) * 2
      }px); opacity: ${0.5 + (stepIndex - 1) / 2}; z-index: ${
        stepIndex - 1 < 0.5 ? 9 : 10
      }`;
    }
  }
</script>

<div class="container" style={containerStyle}>
  <p>when's it happening?</p>
  <input placeholder="name" />
  <p><em>optional</em>: tell people where it's happening</p>
  <input placeholder="location" />

  <div class="step-nav">
    <div class="pge-btn" on:click={() => dispatch("back")}>
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
