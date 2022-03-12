<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script>
  import SearchBar from "$lib/SearchBar.svelte";

  export let title;
</script>

<h1>{title}</h1>
<img src="moustache-peeps.svg" alt="404" />
<SearchBar />
