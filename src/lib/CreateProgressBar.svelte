<script lang="ts">
  export let steps: string[];
</script>

<div class="wrapper">
  {#each steps as step}
    <div class="step">{step}</div>
    {#if steps[steps.length - 1] !== step}
      <div class="connector" />
    {/if}
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template: none / 3rem auto 3rem auto 3rem;
    align-items: center;

    height: min-content;
  }

  .step {
    box-sizing: border-box;
    border: rgba(0, 0, 0, 0.5) solid 5px;
    height: 3rem;
    width: 3rem;

    border-radius: 3rem;

    position: relative;
    text-align: center;
  }

  .connector {
    height: 0.5rem;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
