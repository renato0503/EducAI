<?php

function dobrar(array &$w): void
{
    $j = 0;
    for ($j = 0; $j <= 4; $j++) {
        $w[$j] = $w[$j] * 2;
    }
}

function soma(array &$w): int
{
    $j = 0;
    $total = 0;
    $total = 0;
    for ($j = 0; $j <= 4; $j++) {
        $total = $total + $w[$j];
    }
    return $total;
}

$v = array_fill(0, 5, 0);
$i = 0;

for ($i = 0; $i <= 4; $i++) {
    $v[$i] = (int) trim(fgets(STDIN));
}
dobrar($v);
for ($i = 4; $i >= 0; $i--) {
    echo $v[$i] . " ";
}
echo "\n";
echo "Soma: " . soma($v) . "\n";
