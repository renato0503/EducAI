<?php

$v = array_fill(0, 5, 0);
$i = 0;
$maior = 0;

echo "Digite 5 numeros:\n";
for ($i = 0; $i <= 4; $i++) {
    $v[$i] = (int) trim(fgets(STDIN));
}
$maior = $v[0];
for ($i = 1; $i <= 4; $i++) {
    if ($v[$i] > $maior) {
        $maior = $v[$i];
    }
}
echo "Maior: " . $maior . "\n";
