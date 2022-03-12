<script lang="ts">
  import Header from "$lib/header/Header.svelte";
  import "../app.css";
</script>

<Header />

<main>
  <slot />
</main>

<footer>
  <hr />
  {new Date().getFullYear()} <span class="footer-pge">pge</span>™
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  hr {
    stroke-width: 5px;
  }
  footer {
    margin: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 400;
    font-style: italic;
  }

  .footer-pge {
    font-weight: bold;
    margin-left: 0.3rem;
  }
</style>
