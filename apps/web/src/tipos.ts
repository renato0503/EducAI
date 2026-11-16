import type { MapaTokens } from "@educai/compiler";

export const LINGS = ["python", "java", "c", "cpp", "php"] as const;
export type Ling = (typeof LINGS)[number];

export interface CodigoMapeado {
  codigo: string;
  mapa: MapaTokens;
}

export interface NoFixture {
  tipo: string;
  rotulo: string;
  linguagem?: Ling;
}

/** Formato gerado por `pnpm fixtures` (fixtures/README.md). */
export interface Fixture {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  ptbr: CodigoMapeado;
  linguagens: Record<Ling, CodigoMapeado>;
  nos: Record<string, NoFixture>;
  semEquivalente: Record<Ling, string[]>;
  notas: Record<string, Partial<Record<Ling | "geral", string>>>;
}

export interface CartaoTipo {
  nome: string;
  basico: string;
  aprofundar: string;
  linguagens: Partial<Record<Ling, { como: string; pegadinha?: string }>>;
  semEquivalente?: Partial<Record<Ling, string>>;
}

export interface CartaoSintetico {
  nome: string;
  basico: string;
  aprofundar: string;
}
