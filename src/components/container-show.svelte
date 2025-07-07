<script lang="ts">
  import type { Snippet } from 'svelte';

  let { show = $bindable(), children } = $props<{
    show: boolean;
    children: Snippet;
  }>();

  //TODO: AL show LE PONEMOS EL bindable para que se pueda cambiar desde afuera el valor de show

  const clickShow = () => {
    show = !show;

    return show;
  };
</script>

{#if show}
  <div
    class="group items-top relative flex rounded-lg rounded-tr-none outline-2 outline-transparent hover:rounded-tr-none hover:outline-blue-500"
  >
    {@render children()}
    <button
      class="absolute -top-0.5 -right-[26px] z-10 hidden w-min cursor-pointer rounded-r-lg border-2 border-blue-500 bg-blue-500 group-hover:block"
      onclick={clickShow}
    >
      👁️
    </button>
  </div>
{/if}

<style>
  div {
    width: var(--width, 100%);
    height: var(--height, min-content);
    min-width: var(--min-width, none);
    max-width: var(--max-width, none);
  }

  @media screen and (width < 720px) {
    div{
      height: min-content;
    }
  }

</style>
