<script>
  export let title = "";
  let isHovered = false;
  let x;
  let y;

  function mouseOver(event) {
    isHovered = true;
    mouseMove(event);
  }
  function mouseMove(event) {
    x = event.pageX + 10 - window.scrollX;
    y = event.pageY + 10 - window.scrollY;
  }
  function mouseLeave() {
    isHovered = false;
  }
</script>

<div
  class="wrapper"
  on:mouseover={mouseOver}
  on:mouseleave={mouseLeave}
  on:mousemove={mouseMove}
  on:scroll={mouseLeave}
  on:focus={() => (isHovered = true)}
  on:focusout={() => (isHovered = false)}
>
  <slot />
</div>

{#if isHovered}
  <div style="top: {y}px; left: {x}px;" class="tooltip">{title}</div>
{/if}

<style>
  .wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
  }
  .tooltip {
    border: 1px solid #ddd;
    box-shadow: 1px 1px 1px #ddd;
    background: white;
    border-radius: 10px;
    padding: 10px;
    position: fixed;
    z-index: 100;
    max-width: 300px;

    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
    font-style: normal;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
  }
</style>
