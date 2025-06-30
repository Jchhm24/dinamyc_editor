<script lang="ts">
  import '@styles/global.css';
  import type { Img } from '@interfaces/img.interface';
  import type { Title } from '@interfaces/title.interface';
  import type { Content } from '@interfaces/content.interface';

  // Definir las props con sus tipos
  let { img, title, content }: { img: Img; title: Title; content: Content } =
    $props();

    const click = () => {
      img.show = !img.show;
      alert('Las imagen ya no se sera visibe, trabajando en las opciones para se vuelva visible');
    }

</script>

<section
  class="flex flex-row items-start justify-center p-4 gap-4 w-full border-2 border-gray-300 rounded-lg"
>
  {#if img.show}
    <div class="w-1/2 relative group box-border border-2 border-black/0 rounded-lg rounded-tr-none hover:border-blue-500 hover:rounded-tr-none
      flex items-top
    ">
      <img src={img.src} alt={img.alt} class="w-full h-auto rounded-lg group-hover:rounded-tr-none object-fit-cover" />
      <button class="absolute z-10 border-2 border-blue-500 bg-blue-500 top-0 right-0 translate-x-[22px] w-min group-hover:block" onclick={click}>
        👁️
      </button>
    </div>
  {/if}

  <div class="flex flex-col items-start justify-center w-1/2">
    {#if title.show}
      <h1 class="text-2xl font-bold mt-4">{title.text}</h1>
    {/if}

    {#if content.show}
      <p class="mt-2 text-gray-700">{content.text}</p>
    {/if}
  </div>
</section>
