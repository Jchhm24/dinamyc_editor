export const handleTextarea = () => {
  const handleRows = (event: Event, bind: { text: string }) => {
    const element = event.target as HTMLTextAreaElement;

    //** VERIFICAMOS SI EL TEXTLINE ES MAYOR A LAS ROWS DEL TEXTAREA PARA AJUSTAR EL TEXTO Y LAS FILAS **//
    const textLines = getActualRows(element);

    if(textLines <= element.rows){
      bind.text = element.value;
    }else{
      // creamos el un array con el texto del contenido del textarea para ajustar las filas
      let textArray = element.value.split('');

      while (textArray.length > 0 && getActualRows(element) > element.rows) {
        textArray.pop();
        element.value = textArray.join('');
      }

      // Actualizamos el bind de Svelte hasta que se acabe el whil
      bind.text = textArray.join('');
    }
  };

  const handleKeydown = (event: KeyboardEvent, rows: number) => {
    const target = event.target as HTMLTextAreaElement;
    const currentLines = target.value.split('\n').length;

    // Si se presiona Enter y ya estamos en el máximo de líneas
    if (event.key === 'Enter' && currentLines >= rows) {
      event.preventDefault();
      return false;
    }
  };

  const getActualRows = (element: HTMLTextAreaElement) => {
    const lineHeight = parseInt(getComputedStyle(element).lineHeight);
    const actualRows = Math.ceil(element.scrollHeight / lineHeight);
    return actualRows;
  }

  return {
    handleRows,
    handleKeydown,
  };
};
 