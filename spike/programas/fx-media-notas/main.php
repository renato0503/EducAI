<?php

$n1 = 0.0;
$n2 = 0.0;
$n3 = 0.0;
$n4 = 0.0;
$media = 0.0;

echo "Digite as 4 notas:\n";
$n1 = (float) trim(fgets(STDIN));
$n2 = (float) trim(fgets(STDIN));
$n3 = (float) trim(fgets(STDIN));
$n4 = (float) trim(fgets(STDIN));
$media = ($n1 + $n2 + $n3 + $n4) / 4;
printf("Media: %.2F\n", $media);
if ($media >= 7) {
    echo "Aprovado\n";
} else {
    echo "Reprovado\n";
}
