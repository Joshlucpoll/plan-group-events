<script lang="ts">
  import logo from "./pge-logo.svg";
</script>

<header>
  <div class="logo corner">
    <a sveltekit:prefetch href="/">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <div class="corner">
    <a sveltekit:prefetch href="/create" class="create-btn">
      <div class="create">Create</div>
    </a>
  </div>
</header>

<style>
  header {
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
    z-index: 10;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .corner {
    margin: 1rem 2rem 0rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    transition: transform 200ms ease;
  }

  .corner a {
    width: 100%;
    /* height: 100%; */
    text-decoration: none;
  }

  .corner img {
    width: 4em;
    /* height: 2em; */
    object-fit: contain;
    cursor: pointer;
  }

  .create-btn {
    padding: 0.75rem 1rem;
    background-color: white;
    border-radius: 0.25rem;
    border: solid 2px black;
    cursor: pointer;
    transition: transform 200ms ease;
  }

  .create-btn:hover,
  .logo:hover {
    transform: scale(1.05);
  }

  .create {
    color: black;
    font-weight: bold;
  }
</style>
