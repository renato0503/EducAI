<?php

$total = 0;
$i = 0;

function somar(int $valor): void
{
    global $total;
    $total = $total + $valor;
}

function dobroDoTotal(): int
{
    global $total;
    return $total * 2;
}

$total = 0;
for ($i = 1; $i <= 4; $i++) {
    somar($i * 10);
}
echo "total: " . $total . "\n";
echo "dobro: " . dobroDoTotal() . "\n";
