<?php

$a = 0;
$b = 0;
$x = 0.0;
$par = false;

$a = (int) trim(fgets(STDIN));
$b = (int) trim(fgets(STDIN));
printf("%d / %d = %.2F\n", $a, $b, $a / $b);
echo $a . " div " . $b . " = " . intdiv($a, $b) . "\n";
echo $a . " mod " . $b . " = " . $a % $b . "\n";
$par = $a % 2 == 0;
echo "a e par? " . ($par ? "verdadeiro" : "falso") . "\n";
$x = 0.125;
printf("0.125 com 2 casas: %.2F\n", $x);
$x = 2.675;
printf("2.675 com 2 casas: %.2F\n", $x);
$x = 0.1 + 0.2;
printf("0.1 + 0.2 = %.2F\n", $x);
