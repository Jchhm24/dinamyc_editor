<script lang="ts">
  import '@styles/global.css';
  import type { Snippet } from 'svelte';

  let { children } = $props<{ children: Snippet }>();

</script>

<section
  class="flex w-screen items-center justify-center gap-4 rounded-lg border-2 border-gray-300"
>
    {@render children()}
</section>

<!-- 
    Este contendor se encargara de encapsular a las plantillas que se vayan creando
-->

<style>
  section {
    height: var(--height, auto);
    flex-direction: var(--flex-direction, row);
  }

  @media screen and (width < 720px) {
    section {
      flex-direction: column;
      height: min-content;
    }
  }
</style>
