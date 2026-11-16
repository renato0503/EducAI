import type { Linha } from "../segmentos";

interface Props {
  titulo: string;
  ling: string;
  linhas: Linha[];
  selecionado: string | null;
  hover: string | null;
  novo: string | null;
  aviso: string | null;
  grande?: boolean;
  onSelecionar: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function PainelCodigo({
  titulo,
  ling,
  linhas,
  selecionado,
  hover,
  novo,
  aviso,
  grande,
  onSelecionar,
  onHover,
}: Props) {
  return (
    <section className={`painel${grande ? " painel-grande" : ""}`} data-ling={ling}>
      <header className="painel-topo">
        <span className="painel-nome">{titulo}</span>
        {aviso && <span className="painel-aviso">{aviso}</span>}
      </header>
      <pre className="codigo" onMouseLeave={() => onHover(null)}>
        {linhas.map((linha, idx) => (
          <div className="linha" key={linha.numero}>
            <span className="num" aria-hidden="true">
              {idx + 1}
            </span>
            <span className="conteudo">
              {linha.segmentos.map((s, i) => {
                const dono = s.nos[0];
                if (!dono) return <span key={i}>{s.texto}</span>;
                const classes = ["tok"];
                if (selecionado && s.nos.includes(selecionado)) classes.push("sel");
                if (hover && s.nos.includes(hover)) classes.push("hov");
                if (novo && s.passo === novo) classes.push("novo");
                return (
                  <span
                    key={i}
                    className={classes.join(" ")}
                    onClick={() => onSelecionar(dono)}
                    onMouseEnter={() => onHover(dono)}
                  >
                    {s.texto}
                  </span>
                );
              })}
              {linha.segmentos.length === 0 && " "}
            </span>
          </div>
        ))}
      </pre>
    </section>
  );
}
