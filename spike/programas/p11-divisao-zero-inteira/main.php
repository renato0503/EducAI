<?php

$a = 0;
$b = 0;

$a = (int) trim(fgets(STDIN));
$b = (int) trim(fgets(STDIN));
echo "inteira: " . intdiv($a, $b) . "\n";
