<script lang="ts">
  import { onMount } from "svelte";
  import Header from "$lib/header/Header.svelte";
  import "../app.css";

  onMount(() => {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute(
      "content",
      viewport.content + ", height=" + window.innerHeight
    );
  });
</script>

<Header />

<main>
  <slot />
</main>

<footer>
  <div class="horizontal-line" />
  <div class="items">
    <div>
      © pge
      {new Date().getFullYear()}. Some rights reserved
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
    <a href="/privacy">privacy</a>
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
    •
    <a href="https://icons8.com" target="_blank" rel="noopener noreferrer"
      >icons by Icons8</a
    >
  </div>
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-bottom: 0;
    width: 100%;
    min-height: max-content;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    /* margin-top: 5rem; */
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    background-color: black;
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
    flex-wrap: wrap;
    line-height: 1.6rem;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
    padding: 0 2rem;
  }

  .items > * {
    padding: 0 0.75rem;
  }

  a {
    text-decoration: underline;
    color: inherit;
  }
</style>
