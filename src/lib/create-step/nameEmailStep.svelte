<script lang="ts">
  import Tooltip from "$lib/Tooltip.svelte";
  import { createEventDispatcher } from "svelte";

  export let stepIndex;

  const dispatch = createEventDispatcher();

  let containerStyle =
    "transform: scale(0) translateY(0); filter: blur(0); opacity: 1; z-index: 10";

  $: {
    if (stepIndex >= 1) {
      containerStyle = `transform: scale(${
        0.666 - ((stepIndex - 1) * 2) / 3
      }) translateY(-50%); filter: blur(2px); opacity: 0.5; z-index: 9`;
    } else {
      containerStyle = `transform: scale(${1 - stepIndex / 3}) translateY(-${
        stepIndex * 50
      }%); filter: blur(${stepIndex * 2}px); opacity: ${
        1 - stepIndex / 2
      };  z-index: ${stepIndex < 0.5 ? 10 : 8}`;
    }
  }
</script>

<div class="container" style={containerStyle}>
  <p>
    well first, I’m going to need the name of the organiser (probably yours)<Tooltip
      title="why? so people know who's organising the event!"
    >
      <img
        id="help-icon"
        src="https://img.icons8.com/material-outlined/24/000000/help.png"
        alt="help icon"
      />
    </Tooltip>
  </p>
  <input placeholder="name" />
  <p><em>optional</em>: add your email to edit the event later on</p>
  <input placeholder="email" />

  <div class="step-nav">
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

  #help-icon {
    opacity: 0.6;
    display: inline;
    height: 1.2rem;
    padding: 0 0.2rem 0 0.2rem;
    margin-top: -0.5rem;
  }

  p {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
  }

  p:nth-child(1) {
    margin-top: 0;
  }

  input {
    padding: 0.7rem 0.7rem;
    border: solid 2px black;
    border-radius: 0.75rem;
    max-width: min(400px, 50vw);
    width: 100%;
  }

  .step-nav {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
  }
</style>
