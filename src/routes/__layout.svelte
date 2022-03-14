<script lang="ts">
  import Header from "$lib/header/Header.svelte";
  import "../app.css";
</script>

<Header />

<main>
  <slot />
</main>

<footer>
  <div class="horizontal-line" />
  <div class="items">
    <div>
      pge @
      {new Date().getFullYear()}
    </div>
    •
    <a href="https://joshlucpoll.com" target="_blank" rel="noopener noreferrer"
      >joshlucpoll</a
    >
    •
    <a
      href="mailto:hello@plangroup.events"
      target="_blank"
      rel="noopener noreferrer">mail</a
    >
    •
    <a
      href="https://github.com/Joshlucpoll/plan-group-events/issues"
      target="_blank"
      rel="noopener noreferrer">feature request</a
    >
    •
    <a
      href="https://github.com/Joshlucpoll/plan-group-events"
      target="_blank"
      rel="noopener noreferrer">source</a
    >
  </div>
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

  footer {
    margin-top: 5rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-weight: 400;
    font-style: italic;
    color: white;
    background-color: black;
    /* opacity: 0.5; */
  }

  .horizontal-line {
    width: 100%;
    height: 1px;
    background-color: black;
    opacity: 0.3;
    margin-bottom: 2rem;
  }

  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
  }

  .items > * {
    padding: 0 0.75rem;
  }

  a {
    text-decoration: underline;
    color: inherit;
  }
</style>
