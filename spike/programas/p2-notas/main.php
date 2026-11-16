<?php

$n = 0;
$i = 0;
$nota = 0.0;
$soma = 0.0;
$media = 0.0;

echo "Quantas notas?\n";
$n = (int) trim(fgets(STDIN));
$soma = 0;
for ($i = 1; $i <= $n; $i++) {
    echo "Nota " . $i . ":\n";
    $nota = (float) trim(fgets(STDIN));
    $soma = $soma + $nota;
}
$media = $soma / $n;
printf("Media: %.2F\n", $media);
printf("Media com 1 casa: %.1F\n", $media);
if ($media >= 7) {
    echo "Aprovado\n";
} else {
    echo "Reprovado\n";
}
