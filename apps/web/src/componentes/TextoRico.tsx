/** Mostra texto do catálogo, transformando trechos entre crases em `<code>`. */
export function TextoRico({ texto }: { texto: string }) {
  const partes = texto.split("`");
  return (
    <>
      {partes.map((parte, i) => (i % 2 === 1 ? <code key={i}>{parte}</code> : <span key={i}>{parte}</span>))}
    </>
  );
}
