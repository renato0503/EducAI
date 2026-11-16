<?php

function fatorial(int $k): int
{
    $i = 0;
    $resultado = 0;
    $resultado = 1;
    for ($i = 2; $i <= $k; $i++) {
        $resultado = $resultado * $i;
    }
    return $resultado;
}

$n = 0;

echo "Calcular o fatorial de:\n";
$n = (int) trim(fgets(STDIN));
echo $n . "! = " . fatorial($n) . "\n";
