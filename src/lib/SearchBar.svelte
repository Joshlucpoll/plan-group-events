<script lang="ts">
  import Tooltip from "./Tooltip.svelte";

  const urlIdPattern = /(\b[^\d\W]+\b(?<delimiter>[-\. ])){2}\b[^\d\W]+\b/;

  const placeholders = [
    "machine career guy",
    "plant-wind-document",
    "Tongue Might Swimming",
    "style.move.tale",
    "Smell-Door-Train",
    "Spell.Drama.Ball",
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

  async function handleKeyPress(e) {
    if (e.charCode == 13) {
      const lower = searchQuery.toLowerCase();
      const match = urlIdPattern.exec(lower);

      if (match)
        document.location.href = `/${match[0]
          .split(match.groups.delimiter)
          .join("-")}`;
      else {
        subtitle.innerHTML = `'${searchQuery}'' is an invalid event id :(`;
        subtitle.style.color = "red";

        subtitle.animate(
          [
            { transform: "translateX(3px)" },
            { transform: "translateX(-3px)" },
            { transform: "translateX(3px)" },
            { transform: "translateX(0px)" },
            // { transform: "translateX(0px)" },
            // { transform: "translateX(-1px)" },
            // { transform: "translateX(-2px)" },
            // { transform: "translateX(-3px)" },
            // { transform: "translateX(-3px)" },
            // { transform: "translateX(-2px)" },
            // { transform: "translateX(-1px)" },
            // { transform: "translateX(0px)" },
            // { transform: "translateX(1px)" },
            // { transform: "translateX(2px)" },
            // { transform: "translateX(3px)" },
            // { transform: "translateX(3px)" },
            // { transform: "translateX(2px)" },
            // { transform: "translateX(1px)" },
            // { transform: "translateX(0px)" },
          ],
          { duration: 200, iterations: 3 }
        );
      }
    }
  }

  let subtitle;
  let subtitleError = false;
  let searchBar;
  let searchQuery = "";
  $: {
    if (searchQuery == "") {
    }
  }
  updatePlaceholder();
  updateCursor();
</script>

<div class="input-wrapper">
  <div class="input-container">
    <input
      type="search"
      bind:this={searchBar}
      placeholder={placeholderAnimation
        ? placeholderText + placeholderCursor
        : ""}
      on:focus={() => (placeholderAnimation = false)}
      on:focusout={() => (placeholderAnimation = true)}
      on:keypress={handleKeyPress}
      bind:value={searchQuery}
    />
    <div
      class="paste-btn"
      on:click={async () => {
        searchQuery = await navigator.clipboard.readText();
        searchBar.focus();
      }}
    >
      paste
    </div>
  </div>
  <h2 bind:this={subtitle} class="subtitle">
    type your word-blend
    <Tooltip
      title="a word blend is created for each event, it's made of 3 words. if you made an event check your email for the word blend, or ask the organiser if you didn't"
    >
      <img
        id="help-icon"
        src="https://img.icons8.com/material-outlined/24/000000/help.png"
        alt="help icon"
      />
    </Tooltip>
    to see what's planned
  </h2>
</div>

<style>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: rgb(255, 255, 255);
    border-radius: 0.75rem;
    border: solid 2px black;
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
    border-radius: 0.75rem;
    border: none;

    text-align: center;
    background-color: transparent;
  }

  input:focus {
    outline: none;
  }

  @keyframes shake {
    25% {
      transform: translateX(4px);
    }
    50% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }

  .paste-btn {
    margin: 0 1rem;
    font-size: 0.75rem;
    font-weight: bold;

    cursor: pointer;
  }

  .subtitle {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    color: rgb(0, 0, 0);
    font-style: italic;
  }

  #help-icon {
    display: inline;
    height: 1.2rem;
    padding: 0 0.2rem 0 0.2rem;
  }
</style>
