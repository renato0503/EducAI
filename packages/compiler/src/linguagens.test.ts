import { describe, expect, it } from "vitest";
import { LINGUAGENS_MVP, LINGUAGENS_V11, NOME_EXIBICAO } from "./linguagens";

describe("linguagens", () => {
  it("o MVP tem 5 linguagens e a v1.1 chega a 8", () => {
    expect(LINGUAGENS_MVP).toHaveLength(5);
    expect(LINGUAGENS_MVP.length + LINGUAGENS_V11.length).toBe(8);
  });

  it("toda linguagem tem nome de exibição", () => {
    for (const l of [...LINGUAGENS_MVP, ...LINGUAGENS_V11]) {
      expect(NOME_EXIBICAO[l]).toBeTruthy();
    }
  });
});
