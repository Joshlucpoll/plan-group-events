<script lang="ts">
  const placeholders = [
    "machine career guy",
    "plant-wind-document",
    "Tongue Might Swimming",
    "style move tale",
    "smell-door-train",
    "Spell Drama Ball",
  ];
  let currentPlaceholder = Math.floor(Math.random() * placeholders.length);
  let placeholderAnimation = true;

  let placeholderText = "";
  let placeholderCursor = "|";

  async function updatePlaceholder() {
    while (true) {
      if (placeholderAnimation) {
        if (placeholderText == placeholders[currentPlaceholder]) {
          await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
          placeholderText = "";
          currentPlaceholder = Math.floor(Math.random() * placeholders.length);
          await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
        }

        placeholderText += Array.from(placeholders[currentPlaceholder]).slice(
          placeholderText.length,
          placeholderText.length + 1
        );
        placeholderText = placeholderText;
        await new Promise((r) => setTimeout(r, 50 + Math.random() * 200));
      } else {
        placeholderText = "";
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  async function updateCursor() {
    while (true) {
      if (placeholderAnimation) {
        placeholderCursor = placeholderCursor == " " ? "|" : " ";
        await new Promise((r) => setTimeout(r, 500));
      } else {
        placeholderCursor = "";
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  let searchQuery = "";
  updatePlaceholder();
  updateCursor();
</script>

<div class="input-container">
  <input
    type="search"
    placeholder={placeholderAnimation
      ? placeholderText + placeholderCursor
      : ""}
    on:focus={() => (placeholderAnimation = false)}
    on:focusout={() => (placeholderAnimation = true)}
    bind:value={searchQuery}
  />
  <div
    class="paste-btn"
    on:click={async () => (searchQuery = await navigator.clipboard.readText())}
  >
    paste
  </div>
</div>

<style>
  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: rgb(255, 255, 255);
    border-radius: 0.5rem;
    border: none;
    box-shadow: 5px 5px 20px 5px rgba(162, 162, 162, 0.459);

    width: calc(100vw - 4rem);
    max-width: 600px;

    transition: all 200ms ease;
  }

  .input-container:hover,
  .input-container:focus-within {
    box-shadow: 5px 5px 30px 5px rgba(162, 162, 162, 0.459);
    max-width: 650px;
    transform: scale(1.05);
  }
  input {
    padding: 1rem;
    width: 100%;

    color: black;
    border-radius: 0.5rem;
    border: none;

    text-align: center;
  }

  input:focus {
    outline: none;
  }
  .paste-btn {
    margin: 0 1rem;
    font-size: 0.75rem;

    cursor: pointer;
  }
</style>
