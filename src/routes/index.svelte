<script context="module" lang="ts">
  import SearchBar from "$lib/SearchBar.svelte";
  import smoothscroll from "smoothscroll-polyfill";

  export const prerender = true;

  function longShadowCalculator(
    direction: number,
    length: number,
    color: string
  ) {
    let shadows = "";
    for (let i = 1; i < length; i++) {
      let xLength = Math.round(Math.sin(direction) * 100) / 100;
      let yLength = Math.round(Math.cos(direction) * 100) / 100;

      shadows =
        shadows + xLength * i + "px " + yLength * i + "px " + color + ", ";
    }
    shadows = shadows.slice(0, -2);
    return shadows;
  }

  smoothscroll.polyfill();
  let aboutEl;
  const shadowStyle = "text-shadow: " + longShadowCalculator(0.78, 50, "black");
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <div>
    <h1 class="title" style={shadowStyle}>
      <span>plan</span><span>group</span><span>events</span>
    </h1>
    <img class="cover" src="cover.svg" alt="coverphoto" />
  </div>

  <div class="container">
    <SearchBar />
  </div>

  <div
    on:click={() => aboutEl.scrollIntoView({ behavior: "smooth" })}
    class="explore-btn"
  >
    Huh?
  </div>
</section>

<div bind:this={aboutEl}>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum
  luctus elit nec sollicitudin. Phasellus eget sem quis nulla pellentesque
  elementum. Sed vel lectus suscipit, finibus diam eget, tempus felis. Nulla non
  cursus risus. Nullam leo mi, pharetra in ex at, bibendum sollicitudin mi.
  Curabitur sit amet blandit ex, eu tempus tellus. Donec elementum rutrum
  fermentum. Nullam feugiat nulla nec tortor feugiat, eu fermentum justo
  dapibus. Sed ultricies metus quis tempor interdum. Ut dapibus lectus eu tortor
  posuere dapibus. Curabitur et semper lacus. Ut ultrices orci eu lectus
  malesuada, placerat elementum diam lacinia. Sed ac cursus urna. Donec blandit
  vulputate dolor a hendrerit. Quisque sed scelerisque sem, ut interdum sapien.
  Vestibulum feugiat magna vel libero posuere feugiat. Vivamus laoreet euismod
  lacus quis lobortis. Suspendisse at interdum leo, at mattis odio. Nulla
  fringilla, elit quis elementum hendrerit, ante diam molestie velit, vel
  molestie eros mi quis erat. Sed sollicitudin porta risus, ac aliquet lectus
  pulvinar lobortis. In ultrices libero at neque convallis, et venenatis tellus
  dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
  per inceptos himenaeos. Donec tincidunt dui a imperdiet rutrum. Nulla vehicula
  non lectus non ultrices. Curabitur lacus metus, tempus sed nunc rhoncus,
  lacinia hendrerit metus. Duis quis consequat mauris, at convallis justo. Nunc
  vulputate convallis turpis, vitae fringilla ante imperdiet eu. Sed viverra
  gravida massa gravida malesuada. Pellentesque velit nisl, cursus venenatis
  viverra sit amet, commodo id ligula. Fusce condimentum placerat magna, nec
  mattis nisl hendrerit consectetur. Vestibulum arcu arcu, maximus a enim
  ullamcorper, fringilla interdum nibh. Ut tincidunt convallis enim, ac posuere
  dui fringilla sit amet. Proin ullamcorper porta arcu ut hendrerit. Etiam et
  ligula at sapien lacinia fringilla id non felis. Nam mauris leo, ornare id
  lectus ut, bibendum dignissim diam. Vestibulum non fringilla lorem. Proin in
  dui ac ligula interdum pretium eget et lacus. Cras nibh leo, gravida quis
  congue id, pretium id tellus. Curabitur libero sapien, dictum vitae rutrum
  vitae, ultricies et felis. Aliquam pulvinar mollis luctus. Duis eu tempor
  enim. Aenean iaculis sit amet turpis sed ultricies. Praesent mollis mauris
  eget arcu dignissim ullamcorper. Nulla et dignissim ipsum, et interdum lacus.
  Nulla lacus dui, maximus in neque ut, finibus auctor eros. Sed placerat
  aliquet eros vitae viverra. Interdum et malesuada fames ac ante ipsum primis
  in faucibus. Maecenas malesuada ipsum faucibus sapien vestibulum lacinia.
  Curabitur rutrum magna et purus cursus elementum vel at ligula. Donec et
  maximus risus. Mauris blandit suscipit ligula ac ultrices. Proin ut efficitur
  leo, tincidunt posuere turpis. Nam vehicula rhoncus sem, pellentesque
  tristique justo rhoncus ac. Praesent rhoncus orci ac semper semper. Praesent
  quam magna, efficitur sit amet porttitor egestas, ultricies non risus. Etiam
  fringilla maximus odio vel euismod. Maecenas fermentum sapien ac nisi vehicula
  aliquet. Phasellus vitae condimentum enim, et fermentum leo.
</div>

<div class="credit">
  Made by
  <a href="https://joshlucpoll.com" target="_blank" rel="noopener noreferrer">
    Joshlucpoll
  </a>
</div>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    -webkit-justify-content: flex-end;
    height: calc(100vh - 6rem);
    z-index: 5;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    height: 70vh;
    width: 100%;
    object-fit: cover;

    z-index: 0;
  }

  .container {
    position: absolute;
    width: 100%;
    top: calc(70vh - 1.7rem);
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .title {
    position: absolute;
    top: calc(35vh - 6rem);
    left: max(calc(50vw - 300px), 2rem);
    margin: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    z-index: 5;
  }

  .title span {
    font-size: 4rem;
    line-height: 4rem;
    color: white;
    -webkit-text-stroke: 2px black;
    font-weight: bolder;
  }

  .explore-btn {
    margin-bottom: 3rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: black;
    border: solid black 0.15rem;
    cursor: pointer;
    font-weight: bold;

    transition: transform 200ms ease;
  }

  .explore-btn:hover {
    transform: translateY(-0.25rem);
  }

  .credit {
    background-color: #181a1b;
    color: rgba(256, 256, 256, 0.4);
    padding: 10px;
    position: fixed;
    border-top-right-radius: 10px;
    bottom: 0;
    left: 0;
    cursor: default;
    font-size: 15px;
  }

  .credit::selection {
    color: none;
    background: none;
  }

  .credit a::selection {
    color: none;
    background: none;
  }

  .credit a {
    color: white;
    text-decoration: none;
    z-index: 100;
    cursor: pointer;
  }

  .credit a::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #d08b5b;
    background: -webkit-linear-gradient(to right, #a7724d, #f3a46c);
    background: linear-gradient(to right, #a7724d, #f3a46c);
    visibility: hidden;
    transform: scaleX(0);
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    transition: all 0.3s ease-in-out 0s;
  }

  .credit a:hover {
    background: #d08b5b;
    background: -webkit-linear-gradient(to right, #c2875d, #f3a46c);
    background: linear-gradient(to right, #b67343, #f3a46c);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .credit a:hover::before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
</style>
