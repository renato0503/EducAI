import sinteticosJson from "../../../catalogo/sinteticos.json";
import tiposJson from "../../../catalogo/tipos.json";
import type { CartaoSintetico, CartaoTipo, Fixture } from "./tipos";

const modulos = import.meta.glob<Fixture>("../../../fixtures/*/fixture.json", {
  eager: true,
  import: "default",
});

export const FIXTURES: Fixture[] = Object.values(modulos).sort((a, b) => a.ordem - b.ordem);
export const CARTOES_TIPO = tiposJson as Record<string, CartaoTipo>;
export const CARTOES_SINTETICOS = sinteticosJson as Record<string, CartaoSintetico>;
