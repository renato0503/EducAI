<?php

$nome = "";

$nome = rtrim(fgets(STDIN), "\n");
echo "Ola, " . $nome . "!\n";
echo "tamanho: " . strlen($nome) . "\n";
