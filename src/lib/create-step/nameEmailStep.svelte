<script lang="ts">
  import Tooltip from "$lib/Tooltip.svelte";
  import { onMount } from "svelte";
  import { space } from "svelte/internal";

  export let containerHeight;
</script>

<div class="container" bind:clientHeight={containerHeight}>
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
    transform: scale(0.7) translateY(-50%);
    filter: blur(2px);
    opacity: 0.8;
    z-index: 9;
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
    padding: 0.7rem 1.5rem;
    border: solid 2px black;
    border-radius: 2rem;
    max-width: min(400px, 50vw);
    width: 100%;
  }

  .step-nav {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
  }
</style>
