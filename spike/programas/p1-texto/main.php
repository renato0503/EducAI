<?php

$nome = "";
$saudacao = "";

echo "Qual e o seu nome?\n";
$nome = rtrim(fgets(STDIN), "\n");
$saudacao = "Ola, " . $nome . "!";
echo $saudacao . "\n";
echo "Seu nome tem " . strlen($nome) . " caracteres\n";
echo "Progresso: 100%\n";
if ($nome === "fim") {
    echo "Ate logo\n";
} else {
    echo "Bem-vindo\n";
}
