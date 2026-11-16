<?php

$a = 0;
$b = 0;
$x = false;
$y = false;

$a = (int) trim(fgets(STDIN));
$b = (int) trim(fgets(STDIN));
$x = ($a > 0) && ($b > 0);
$y = ($a > 10) || !($b > 10);
echo "ambos positivos? " . ($x ? "verdadeiro" : "falso") . "\n";
echo "y? " . ($y ? "verdadeiro" : "falso") . "\n";
if ($x) {
    if ($a > $b) {
        echo "a maior\n";
    } else {
        if ($a == $b) {
            echo "iguais\n";
        } else {
            echo "b maior\n";
        }
    }
} else {
    echo "algum nao positivo\n";
}
if (($b != 0) && (intdiv($a, $b) > 1)) {
    echo "a e mais que o dobro de b\n";
}
