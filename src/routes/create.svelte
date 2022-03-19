<script lang="ts">
  import CreateProgressBar from "$lib/CreateProgressBar.svelte";

  let titleValue: string;
  let descriptionValue: string;
  let datetime: Date;

  const submitForm = () => {};
</script>

<div class="container">
  <section>
    <h1>So you wanna make an event?</h1>
    <h2>Well first I'm gonna need a name:</h2>
    <input type="text" />
    <input type="date" />
  </section>
  <CreateProgressBar steps={["organiser", "title/descr", "date/location"]} />
</div>

<style>
  section {
    height: 100%;
  }
  .container {
    display: grid;
  }
</style>
