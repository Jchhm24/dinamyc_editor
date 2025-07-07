<script lang="ts">
  import '@styles/global.css';
  import ContainerShow from '@components/container-show.svelte';
  import type { Img } from '@interfaces/img.interface';
  import type { Title } from '@interfaces/title.interface';
  import type { Content } from '@interfaces/content.interface';
  import { handleTextarea } from 'src/helpers/handler-textarea';
  import ContainerPlantilla from '@components/container-plantilla.svelte';

  let {
    img: imgProp,
    title: titleProp,
    content: contentProp,
  } = $props<{
    img: Img;
    title: Title;
    content: Content;
  }>();

  // Crea copias locales reactivas
  let img = $state({ ...imgProp });
  let title = $state({ ...titleProp });
  let content = $state({ ...contentProp });

  const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
</script>

<ContainerPlantilla --height="330px">
  <ContainerShow
    bind:show={img.show}
    --height="100%"
    --width="100%"
    --min-width="260px"
    --max-width="1120px"
  >
    <label for="img-input" class="box-border w-full">
      <img
        src={img.src}
        alt={img.alt}
        class="h-full w-screen cursor-pointer rounded-lg object-cover group-hover:rounded-tr-none"
      />
      <input
        type="file"
        name="img-input"
        id="img-input"
        accept="image/*"
        onchange={handleImageChange}
        class="hidden"
      />
    </label>
  </ContainerShow>

  {#if title.show || content.show}
    <div class="flex h-full w-full flex-col items-start justify-start">
      <ContainerShow bind:show={title.show}>
        <input
          type="text"
          placeholder="Escribe aquí el título de la publicación..."
          class="w-full text-center text-2xl font-bold h-min"
          bind:value={title.text}
        />
      </ContainerShow>

      <ContainerShow bind:show={content.show} --width="100%">
        <textarea
          placeholder="Escribe aquí el contenido de la publicación..."
          bind:value={content.text}
          class="w-full resize-none overflow-hidden"
          rows="12"
          oninput={(event) => handleTextarea().handleRows(event, content)}
          onkeydown={(event) => handleTextarea().handleKeydown(event, 12)}
        ></textarea>
      </ContainerShow>
    </div>
  {/if}
</ContainerPlantilla>

<style>
  @media screen and (width < 720px) { 
    img {
      width: 100%;
    }

    div{
      height: min-content;
    }

    textarea{
      text-align: center;
    }
  }
</style>