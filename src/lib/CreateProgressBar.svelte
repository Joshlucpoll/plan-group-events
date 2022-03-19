<script lang="ts">
  export let steps: string[];

  let currentStep = 0;
</script>

<div class="wrapper">
  {#each steps as step, i}
    <div
      class="step"
      style="opacity: {currentStep < i
        ? 0.3
        : 1}; background-color: {currentStep <= i ? 'transparent' : 'black'};"
    >
      <div class="step-title">
        {step}
      </div>
    </div>
    {#if i != steps.length - 1}
      <div style="opacity: {currentStep <= i ? 0.3 : 1};" class="connector" />
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
    border: black solid 5px;
    height: 3rem;
    width: 3rem;

    border-radius: 3rem;

    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .step-title {
    position: relative;
    top: calc(100% + 1rem);
  }

  .connector {
    height: 0.5rem;
    width: 100%;
    background-color: black;
  }
</style>
