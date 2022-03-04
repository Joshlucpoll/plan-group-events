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
        await new Promise((r) => setTimeout(r, 100 + Math.random() * 300));
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
    on:click={async () => (searchQuery = await navigator.clipboard.readText())}
  >
    Paste
  </div>
</div>

<style>
  input {
    width: 90%;
    max-width: 1000px;

    padding: 1rem;

    background-color: rgb(255, 255, 255);
    border-radius: 0.5rem;
    border: none;
    box-shadow: 5px 5px 15px 5px #00000077;

    color: black;

    text-align: center;
  }
</style>
