<script context="module" lang="ts">
  import SearchBar from "$lib/SearchBar.svelte";

  export const prerender = true;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>plan group events</h1>

  <div class="container">
    <h2>type an event id <span /> to see what's planned:</h2>
    <SearchBar />
  </div>

  <div class="explore-btn">what's this?</div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 1;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  h1 {
    width: 100%;
    color: white;
    font-weight: bolder;
    margin-bottom: 0;
  }
  h2 {
    color: rgb(175, 173, 173);
  }

  .explore-btn {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: white;
    border: solid white 0.15rem;
    cursor: pointer;
    font-weight: bold;

    transition: transform 200ms ease;
  }

  .explore-btn:hover {
    transform: translateY(-0.25rem);
  }
</style>
