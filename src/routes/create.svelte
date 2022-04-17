<script lang="ts">
  import DateLocationStep from "$lib/create-step/dateLocationStep.svelte";
  import NameEmailStep from "$lib/create-step/nameEmailStep.svelte";
  import TitleDescriptionStep from "$lib/create-step/titleDescriptionStep.svelte";
  import CreateProgressBar from "$lib/CreateProgressBar.svelte";

  let containerHeight = 0;
  let stepIndex = 0;
</script>

<div class="container">
  <section>
    <h1
      style="opacity: {stepIndex < 1 ? 1 - stepIndex : 0}; pointerEvents: false"
    >
      So you wanna<br />make an event?
    </h1>
    <div class="step-container">
      <NameEmailStep bind:containerHeight />
      <TitleDescriptionStep />
      <DateLocationStep />
      <div
        class="spacer"
        style="height: {containerHeight * 1.45}px; width: 50px;"
      />
    </div>
  </section>
  <!-- <CreateProgressBar steps={["organiser", "title/descr", "date/location"]} /> -->
</div>

<style>
  section {
    height: 100%;
  }

  h1 {
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  .step-container {
    position: relative;
  }
</style>
