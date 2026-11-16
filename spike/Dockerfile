# Imagem com os 5 runtimes reais do MVP para o spike de equivalência e, a partir da Sprint 5,
# para os testes diferenciais (context.md §6.5). As versões efetivas aparecem no relatório.
# TODO (S5): fixar a imagem base por digest.
FROM debian:bookworm-slim

RUN mkdir -p /usr/share/man/man1 \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      python3 gcc g++ libc6-dev openjdk-17-jdk-headless php-cli nodejs \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /spike
COPY run.mjs ./
COPY programas ./programas

CMD ["node", "run.mjs", "--estrito"]
