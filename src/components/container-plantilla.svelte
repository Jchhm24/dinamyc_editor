<script lang="ts">
  import '@styles/global.css';
  import type { FlexDirection } from 'src/types/flex-direction.types';
  import { type Snippet } from 'svelte';

  let { children } = $props<{ children: Snippet; }>();

  let edit = $state(false);
  let taps = $state(0);
  let sectionRef: HTMLElement;

  const toggleEdit = () => {
    taps++;

    if (taps >= 3) {
      edit = true;
      taps = 0;
    }
  };

  //** Nos ayudara a saber la dirección del layout para saber como podria ser su responsive **//
  let flexDirectionVar = $state<FlexDirection>('row');

  const declarateResponse = () => {
    flexDirectionVar = getComputedStyle(sectionRef)
      .getPropertyValue('--flex-direction-responsive')
      .toString()
      .trim() as FlexDirection;

    switch (flexDirectionVar) {
      case 'row':
        sectionRef.style.setProperty('--flex-direction-responsive', 'column');
        break;
      case 'row-reverse':
        sectionRef.style.setProperty(
          '--flex-direction-responsive',
          'column-reverse'
        );
        break;
      case 'column':
        sectionRef.style.setProperty('--flex-direction-responsive', 'column');
        break;
      case 'column-reverse':
        sectionRef.style.setProperty(
          '--flex-direction-responsive',
          'column-reverse'
        );
        break;
      default:
        sectionRef.style.setProperty('--flex-direction-responsive', 'row');
        break;
    }
  }

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

    // Declaramos el responsive para el contenedor
    declarateResponse();

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
  :root {
    --flex-direction: row;
    --flex-direction-responsive: row;
  }

  section {
    height: var(--height, auto);
    flex-direction: var(--flex-direction);
  }

  @media screen and (width < 720px) {
    section {
      flex-direction: var(--flex-direction-responsive);
      height: min-content;
    }
  }
</style>
