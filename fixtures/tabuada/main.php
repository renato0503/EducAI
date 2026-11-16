⟦syn:php.open_tag⟧<?php⟦/⟧

⟦var/0⟧$n = 0;
$i = 0;⟦/⟧

⟦main/0⟧echo ⟦main/0/0⟧"Tabuada de qual numero?\n"⟦/⟧;⟦/⟧
⟦main/1⟧⟦main/1/alvo⟧$n⟦/⟧ = (int) trim(fgets(STDIN));⟦/⟧
⟦main/2⟧for (⟦main/2/var⟧$i⟦/⟧ = ⟦main/2/de⟧1⟦/⟧; $i <= ⟦main/2/ate⟧10⟦/⟧; $i++) {
    ⟦main/2/corpo/0⟧echo ⟦main/2/corpo/0/0⟧$n⟦/⟧ . " x " . ⟦main/2/corpo/0/2⟧$i⟦/⟧ . " = " . ⟦main/2/corpo/0/4⟧$n * $i⟦/⟧ . "\n";⟦/⟧
}⟦/⟧
