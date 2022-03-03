<script context="module" lang="ts">
  import SearchBar from "$lib/SearchBar.svelte";

  export const prerender = true;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>Plan Group Events</h1>

  <div class="container">
    <h2>type an event id to see what's planned:</h2>
    <SearchBar />
  </div>

  <div />
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
</style>
