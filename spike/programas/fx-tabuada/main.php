<?php

$n = 0;
$i = 0;

echo "Tabuada de qual numero?\n";
$n = (int) trim(fgets(STDIN));
for ($i = 1; $i <= 10; $i++) {
    echo $n . " x " . $i . " = " . $n * $i . "\n";
}
