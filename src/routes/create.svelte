<script lang="ts">
  import DateLocationStep from "$lib/create-step/dateLocationStep.svelte";
  import NameEmailStep from "$lib/create-step/nameEmailStep.svelte";
  import TitleDescriptionStep from "$lib/create-step/titleDescriptionStep.svelte";
  import { tweened } from "svelte/motion";
  import { backInOut } from "svelte/easing";

  let containerHeight = 0.0;

  let stepIndex = tweened(0.0, { easing: backInOut, duration: 1500 });
</script>

<div class="container">
  <section>
    <h1
      style="opacity: {$stepIndex < 0.8
        ? 1 - $stepIndex * 2
        : 0}; transform: translateY({$stepIndex * 40}px); pointerEvents: false"
    >
      So you want to<br />make an event?
    </h1>
    <div class="step-indicator under">
      <div
        class="step"
        on:click={() => stepIndex.set(0)}
        style={`height: ${(containerHeight / 3) * 1.5}px;`}
      />
      <div
        class="step"
        on:click={() => stepIndex.set(1)}
        style={`height: ${(containerHeight / 3) * 1.5}px;`}
      />
      <div
        class="step"
        on:click={() => stepIndex.set(3)}
        style={`height: ${(containerHeight / 3) * 1.5}px;`}
      />
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
        style="height: {containerHeight * 1.3}px; width: 50px;"
      />
    </div>
    <div
      class="magic-btn"
      style={`opacity: ${($stepIndex - 1.75) * 4}; transform: translateY(-${
        220 - ($stepIndex - 2) * 200
      }%);`}
    >
      <div class="pge-btn">
        <div class="btn-text">make event!</div>
      </div>
    </div>
  </section>
</div>

<style>
  .container {
    min-height: calc(100vh - 10rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  section {
    /* vertical-align: middle; */
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
    cursor: pointer;
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

  .magic-btn {
    /* padding: 0 auto; */
    display: grid;
    grid-template: 1fr / 1fr;
    place-items: center;
    z-index: 5;
    transition: transform 200ms ease;
    transform-origin: 20% 0%;
  }

  .magic-btn:hover {
    transform: scale(1.05);
  }

  .magic-line {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 5px;
    border-radius: 2.5px;
    background-color: black;
    transform-origin: center;
    /* left: 0; */
  }
</style>
