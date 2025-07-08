<script lang="ts">
  import '@styles/global.css';
  import { type Snippet } from 'svelte';

  let { children } = $props<{ children: Snippet }>();

  let edit = $state(false);
  let taps = $state(0);
  let sectionRef: HTMLElement;

  const toggleEdit = () => {
    taps++;

    console.log('Taps:', taps);

    if (taps >= 3) {
      edit = true;
      taps = 0;
    }
  };

  $effect(() => {
    const resetTaps = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      //** Verificamos si el clic está dentro del section **//
      const isInsideSection = sectionRef && sectionRef.contains(target);

      if (isInsideSection) return;

      // TODO: Solo se ejecuta si el clic no está dentro del
      taps = 0;
      edit = false;
    };

    window.addEventListener('click', resetTaps);

    // CleanUp function, solo se ejecuta cuando el componente se desmonta y se encarga de eliminar el listener
    // para evitar fugas de memoria o comportamientos inesperados
    return () => {
      window.removeEventListener('click', resetTaps);
    };
  });
</script>

<section
  bind:this={sectionRef}
  class="relative flex w-screen items-center justify-center gap-4 rounded-lg border-2 border-transparent hover:border-violet-400"
>
  <div
    onclick={toggleEdit}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') toggleEdit();
    }}
    role="button"
    tabindex="0"
    class={[
      'absolute inset-0 h-full w-full',
      edit ? 'z-0' : 'z-10 cursor-pointer',
    ]}
  ></div>

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
