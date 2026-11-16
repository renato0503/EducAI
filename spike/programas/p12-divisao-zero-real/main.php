<?php

$a = 0;
$b = 0;
$x = 0.0;

$a = (int) trim(fgets(STDIN));
$b = (int) trim(fgets(STDIN));
$x = $a / $b;
printf("real: %.2F\n", $x);
