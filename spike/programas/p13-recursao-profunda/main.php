<?php

function soma(int $k): int
{
    if ($k == 0) {
        return 0;
    } else {
        return $k + soma($k - 1);
    }
}

$n = 0;

$n = (int) trim(fgets(STDIN));
echo "soma: " . soma($n) . "\n";
