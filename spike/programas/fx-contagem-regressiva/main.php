<?php

$n = 0;

echo "Contar a partir de:\n";
$n = (int) trim(fgets(STDIN));
while ($n > 0) {
    echo $n . "\n";
    $n = $n - 1;
}
echo "Fogo!\n";
