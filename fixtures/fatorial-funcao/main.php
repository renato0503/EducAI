⟦syn:php.open_tag⟧<?php⟦/⟧

⟦f0⟧⟦f0:assinatura⟧function fatorial(⟦f0/param/0⟧int $k⟦/⟧): int⟦/⟧
{
    ⟦f0/var/0⟧$i = 0;
    $resultado = 0;⟦/⟧
    ⟦f0/0⟧$resultado = 1;⟦/⟧
    ⟦f0/1⟧for (⟦f0/1/var⟧$i⟦/⟧ = ⟦f0/1/de⟧2⟦/⟧; $i <= ⟦f0/1/ate⟧$k⟦/⟧; $i++) {
        ⟦f0/1/corpo/0⟧$resultado = ⟦f0/1/corpo/0/valor⟧$resultado * $i⟦/⟧;⟦/⟧
    }⟦/⟧
    ⟦f0/2⟧return $resultado;⟦/⟧
}⟦/⟧

⟦var/0⟧$n = 0;⟦/⟧

⟦main/0⟧echo ⟦main/0/0⟧"Calcular o fatorial de:\n"⟦/⟧;⟦/⟧
⟦main/1⟧⟦main/1/alvo⟧$n⟦/⟧ = (int) trim(fgets(STDIN));⟦/⟧
⟦main/2⟧echo ⟦main/2/0⟧$n⟦/⟧ . "! = " . ⟦main/2/2⟧fatorial($n)⟦/⟧ . "\n";⟦/⟧
