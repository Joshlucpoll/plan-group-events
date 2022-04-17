<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let containerHeight;

  export let stepIndex;

  const dispatch = createEventDispatcher();

  let containerStyle =
    "transform: scale(0.666) translateY(50%); filter: blur(2px); opacity: 0.5; z-index: 9";

  $: {
    if (stepIndex == 1) {
      containerStyle =
        "transform: scale(1) translateY(0); filter: blur(0px); opacity: 1; z-index: 10";
    } else if (stepIndex < 1) {
      containerStyle = `transform: scale(${0.666 + stepIndex / 3}) translateY(${
        40 - stepIndex * 40
      }%); filter: blur(${2 - stepIndex * 2}px); opacity: ${
        0.5 + stepIndex / 2
      };  z-index: ${stepIndex < 0.5 ? 9 : 10}`;
    } else {
      containerStyle = `transform: scale(${
        1 - (stepIndex - 1) / 3
      }) translateY(-${(stepIndex - 1) * 50}%); filter: blur(${
        (stepIndex - 1) * 2
      }px); opacity: ${1 - (stepIndex - 1) / 2};  z-index: ${
        stepIndex < 1.5 ? 10 : 9
      }`;
    }
  }
</script>

<div
  class="container"
  style={containerStyle}
  bind:clientHeight={containerHeight}
>
  <p>the big event! what's it called?</p>
  <input type="text" placeholder="title" />
  <p>
    <em>optional</em>: add a bit more info, so people know what it's all about
  </p>
  <textarea rows="3" placeholder="description" class="description" />

  <div class="step-nav">
    <div class="pge-btn" on:click={() => dispatch("back")}>
      <div class="btn-text">back</div>
    </div>
    <div class="pge-btn" on:click={() => dispatch("next")}>
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
  }

  p {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
  }

  p:nth-child(1) {
    margin-top: 0;
  }

  input,
  textarea {
    font-family: Raleway;
    font-size: 1rem;
    padding: 0.7rem 0.7rem;
    border: solid 2px black;
    border-radius: 0.75rem;
    max-width: min(400px, 50vw);
    width: 100%;
  }

  .description {
    resize: none;
  }

  .step-nav {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
