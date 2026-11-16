import { describe, expect, it } from "vitest";
import { caracteresDescobertos, extrairMarcadores, textoDoRange } from "./marcadores";

describe("extrairMarcadores", () => {
  it("remove os marcadores e calcula ranges 1-indexados com fim exclusivo", () => {
    const r = extrairMarcadores("⟦a⟧while (⟦b⟧i < 10⟦/⟧) {⟦/⟧");
    expect(r.codigo).toBe("while (i < 10) {");
    expect(r.mapa.b).toEqual([[1, 8, 1, 14]]);
    expect(r.mapa.a).toEqual([[1, 1, 1, 17]]);
    expect(textoDoRange(r.codigo, r.mapa.b![0]!)).toBe("i < 10");
  });

  it("acumula vários ranges para o mesmo nó", () => {
    const r = extrairMarcadores("⟦m⟧int main() {⟦/⟧\n  x;\n⟦m⟧}⟦/⟧");
    expect(r.mapa.m).toEqual([
      [1, 1, 1, 13],
      [3, 1, 3, 2],
    ]);
  });

  it("suporta ranges com várias linhas e lê o tipo no PT-BR", () => {
    const r = extrairMarcadores("⟦s|se⟧se x entao\n  y\nfimse⟦/⟧");
    expect(r.mapa.s).toEqual([[1, 1, 3, 6]]);
    expect(r.tipos).toEqual({ s: "se" });
    expect(textoDoRange(r.codigo, r.mapa.s![0]!)).toBe("se x entao\n  y\nfimse");
  });

  it("acusa marcadores desbalanceados", () => {
    expect(() => extrairMarcadores("⟦a⟧x")).toThrow(/não fechado/);
    expect(() => extrairMarcadores("x⟦/⟧")).toThrow(/sem abertura/);
    expect(() => extrairMarcadores("x⟧")).toThrow(/sem/);
  });

  it("normaliza CRLF", () => {
    expect(extrairMarcadores("⟦a⟧x⟦/⟧\r\ny").codigo).toBe("x\ny");
  });
});

describe("caracteresDescobertos", () => {
  it("lista só caracteres não brancos fora de qualquer range", () => {
    const r = extrairMarcadores("⟦a⟧x = 1;⟦/⟧\n  y;");
    expect(caracteresDescobertos(r.codigo, r.mapa)).toEqual([
      { linha: 2, col: 3, caractere: "y" },
      { linha: 2, col: 4, caractere: ";" },
    ]);
  });
});
