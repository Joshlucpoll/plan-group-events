<script context="module" lang="ts">
  import SearchBar from "$lib/SearchBar.svelte";
  import smoothscroll from "smoothscroll-polyfill";

  export const prerender = true;

  function longShadowCalculator(
    direction: number,
    length: number,
    color: string
  ) {
    let shadows = "";
    for (let i = 1; i < length; i++) {
      let xLength = Math.round(Math.sin(direction) * 100) / 100;
      let yLength = Math.round(Math.cos(direction) * 100) / 100;

      shadows =
        shadows + xLength * i + "px " + yLength * i + "px " + color + ", ";
    }
    shadows = shadows.slice(0, -2);
    return shadows;
  }

  let aboutEl;
  const shadowStyle = "text-shadow: " + longShadowCalculator(0.78, 50, "black");
  if (typeof window !== "undefined") smoothscroll.polyfill();
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <div>
    <div class="title" style={shadowStyle}>
      <span>plan</span><span>group</span><span>events</span>
    </div>
    <img class="cover" src="images/cover.svg" alt="coverphoto" />
  </div>

  <div class="container">
    <SearchBar />
  </div>

  <div
    on:click={() => aboutEl.scrollIntoView({ behavior: "smooth" })}
    class="explore-btn"
  >
    Huh?
  </div>
</section>

<div bind:this={aboutEl} class="horizontal-rule" />

<h1>Wait a minute,<br /> what is this?</h1>
<p class="description">
  Plan Group Events was created to help you plan events for a large number of
  people. Want to suggest an activity to a group chat, but need to book for an
  exact number of people? You’ve come to the right place!
</p>
<div class="step-section">
  <div class="step-wrapper">
    <div class="top-row">
      <div class="step-num">1</div>
      <div class="step-desc">create an event</div>
      <div class="step-num">2</div>
      <div class="step-desc">share to friends</div>
      <div class="step-num">3</div>
      <div class="step-desc">know who's coming</div>
      <img
        class="sitting-peep"
        src="/images/sitting-peep.svg"
        alt="Sitting Peep"
      />
    </div>
    <div class="bottom-row">
      <div />
      <img src="/images/create-peep.svg" alt="Create Peep" />
      <div />
      <img src="/images/share-peep.svg" alt="Share Peep" />
      <div />
      <img src="/images/know-peep.svg" alt="Know Peep" />
    </div>
  </div>
</div>
<a href="/create" class="create-btn">
  <div class="create">Create event</div>
</a>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    -webkit-justify-content: flex-end;
    height: calc(100vh - 6rem);
    z-index: 5;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    height: 70vh;
    width: 100%;
    object-fit: cover;
    object-position: 50% 0%;

    z-index: 0;
  }

  .container {
    position: absolute;
    width: 100%;
    top: calc(70vh - 1.7rem);
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .title {
    position: absolute;
    top: calc(35vh - 6rem);
    left: max(calc(50vw - 300px), 2rem);
    margin: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    z-index: 5;
  }

  .title span {
    font-size: 4rem;
    line-height: 4rem;
    color: white;
    -webkit-text-stroke: 2px black;
    font-weight: bolder;
  }

  .explore-btn {
    margin-bottom: 3rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: black;
    border: solid black 0.15rem;
    cursor: pointer;
    font-weight: bold;

    transition: transform 200ms ease;
  }

  .explore-btn:hover {
    transform: translateY(-0.25rem);
  }

  .horizontal-rule {
    margin: 0 auto 2rem auto;
    height: 1px;
    width: 90%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  h1 {
    margin: 0;
    font-size: 3rem;
    text-align: left;
    color: white;
    -webkit-text-stroke: 2.7px black;
    font-weight: 800;
  }

  .description {
    max-width: 500px;
    font-weight: bold;
    opacity: 0.5;

    margin: 2rem 0;
  }

  .step-section {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    padding: 2rem 0;
    background-color: #e5ba6b;

    box-shadow: inset 0px 10px 8px -4px #00000056,
      inset 0px -10px 8px -4px #00000056;
  }

  .step-wrapper {
    max-width: 1024px;
    margin: 0 auto;
  }

  .top-row,
  .bottom-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .bottom-row {
    align-items: baseline;
  }

  .step-num {
    background-color: white;
    border: solid 0.1rem black;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    line-height: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .step-desc {
    font-weight: bold;
    opacity: 0.5;
  }

  .sitting-peep {
    display: none;
  }

  @media only screen and (max-width: 700px) {
    .top-row {
      flex-direction: column;
    }

    .step-desc {
      margin: 1rem 0;
    }

    .bottom-row {
      display: none;
    }

    .sitting-peep {
      display: block;
      width: 80%;
      max-height: 30vh;
    }
  }

  .create-btn {
    width: fit-content;
    margin: 2rem auto;
    padding: 0.75rem 1rem;
    background-color: white;
    border-radius: 0.5rem;
    border: solid 2px black;
    text-decoration: none;
    cursor: pointer;
    transition: transform 200ms ease;
  }

  .create-btn:hover {
    transform: scale(1.05);
  }

  .create {
    color: black;
    font-weight: bold;
    text-decoration: none;
  }
</style>
