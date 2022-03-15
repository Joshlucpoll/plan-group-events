<script context="module">
  export async function load({ params, fetch, url }) {
    const apiUrl = `https://plangroup.events/api/view?id=${params.id}&${url.searchParams}`;

    const res = await fetch(apiUrl);

    if (res.ok) {
      const json = await res.json();
      return {
        props: {
          event: json.data,
          authenticated: json.authenticated,
        },
      };
    }

    const formattedId = params.id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return {
      status: res.status,
      error: new Error(`Sorry bud, ${formattedId} isn't an event`),
    };
  }
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  onMount(() =>
    window.history.replaceState({}, document.title, window.location.pathname)
  );

  export let event;
  export let authenticated: boolean;
</script>

<!-- <iframe
  title="map"
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBTcj9dG5B99Uouwz4RnrXQuVbDnc7407A
    &q=4RC6+V5 Crawley"
/>
<a href="https://www.google.com/maps/place/Albany,+NY/"
  ><img
    src="https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBTcj9dG5B99Uouwz4RnrXQuVbDnc7407A&center=Albany,+NY&zoom=13&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true"
    alt="Google Map of Albany, NY"
  /></a
>

<img
  width="600"
  src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=-73.7638,42.6564&z=13&l=map&size=600,300"
  alt="Yandex Map of -73.7638,42.6564"
/>
-->
<svelte:head>
  <title>{event ? event.title : $page.params.id}</title>
</svelte:head>

<p>authenticated: {authenticated}</p>
<h1>{event.title}</h1>
<h2>{event.description}</h2>
<h2>{event.location}</h2>
<h2>{new Date(event.datetime).toDateString()}</h2>
<h2>Participants:</h2>
<ul>
  {#each event.participants as participant}
    <li>{participant}</li>
  {/each}
</ul>
