<script>
  export let title = "";
  let isHovered = false;
  let x;
  let y;

  function mouseOver(event) {
    isHovered = true;
    x = event.pageX + 20;
    y = event.offsetY + 20;
  }
  function mouseMove(event) {
    x = event.pageX + 20;
    y = event.offsetY + 20;
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
    display: inline;
  }
  .tooltip {
    border: 1px solid #ddd;
    box-shadow: 1px 1px 1px #ddd;
    background: white;
    border-radius: 10px;
    padding: 6px;
    position: absolute;
    z-index: 100;
    max-width: 300px;

    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
    font-style: normal;
  }
</style>
