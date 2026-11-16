<?php

function fat(int $k): int
{
    if ($k <= 1) {
        return 1;
    } else {
        return $k * fat($k - 1);
    }
}

$n = 0;
$i = 0;

$n = (int) trim(fgets(STDIN));
for ($i = 1; $i <= $n; $i++) {
    echo $i . "! = " . fat($i) . "\n";
}
