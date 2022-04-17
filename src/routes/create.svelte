<script lang="ts">
  import DateLocationStep from "$lib/create-step/dateLocationStep.svelte";
  import NameEmailStep from "$lib/create-step/nameEmailStep.svelte";
  import TitleDescriptionStep from "$lib/create-step/titleDescriptionStep.svelte";
  import CreateProgressBar from "$lib/CreateProgressBar.svelte";
  import { spring, tweened } from "svelte/motion";
  import { backInOut } from "svelte/easing";

  let containerHeight = 0.0;
  let stepIndex = tweened(0.0, { easing: backInOut, duration: 1000 });
</script>

<div class="container">
  <section>
    <h1
      style="opacity: {$stepIndex < 0.8
        ? 1 - $stepIndex
        : 0}; pointerEvents: false"
    >
      So you wanna<br />make an event?
    </h1>
    <div class="step-indicator under">
      <div class="step" style={`height: ${(containerHeight / 3) * 1.5}px;`} />
      <div class="step" style={`height: ${(containerHeight / 3) * 1.5}px;`} />
      <div class="step" style={`height: ${(containerHeight / 3) * 1.5}px;`} />
    </div>
    <div class="step-indicator">
      <div class="step" style={`height: ${containerHeight * 0.5}px;`} />
      <div
        class="step"
        style={`height: ${
          containerHeight * ($stepIndex < 1 ? $stepIndex * 0.5 : 0.5)
        }px; margin-bottom: ${
          containerHeight * ($stepIndex < 1 ? 0.5 - $stepIndex * 0.5 : 0)
        }px;`}
      />
      <div
        class="step"
        style={`height: ${
          containerHeight *
          ($stepIndex < 2 ? ($stepIndex > 1 ? ($stepIndex - 1) * 0.5 : 0) : 0.5)
        }px; margin-bottom: ${
          containerHeight *
          ($stepIndex < 2
            ? $stepIndex > 1
              ? 0.5 - ($stepIndex - 1) * 0.5
              : 0.5
            : 0)
        }px;`}
      />
    </div>
    <div class="step-container">
      <NameEmailStep stepIndex={$stepIndex} on:next={() => stepIndex.set(1)} />
      <TitleDescriptionStep
        stepIndex={$stepIndex}
        bind:containerHeight
        on:next={() => stepIndex.set(2)}
        on:back={() => stepIndex.set(0)}
      />
      <DateLocationStep
        stepIndex={$stepIndex}
        on:back={() => stepIndex.set(1)}
      />
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

  .step-indicator {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: calc((100vw - 1024px) / 4);
    transform: translateY(-18%);
  }

  .under {
    opacity: 0.3;
  }

  .step {
    width: 5px;
    border-radius: 2.5px;
    background-color: rgb(0, 0, 0);
    margin: 0.1rem 0;
  }

  .step-container {
    position: relative;
  }
</style>
