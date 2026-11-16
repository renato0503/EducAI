⟦syn:php.open_tag⟧<?php⟦/⟧

⟦var/0⟧$v = array_fill(0, 5, 0);⟦/⟧
⟦var/1⟧$i = 0;
$maior = 0;⟦/⟧

⟦main/0⟧echo ⟦main/0/0⟧"Digite 5 numeros:\n"⟦/⟧;⟦/⟧
⟦main/1⟧for (⟦main/1/var⟧$i⟦/⟧ = ⟦main/1/de⟧0⟦/⟧; $i <= ⟦main/1/ate⟧4⟦/⟧; $i++) {
    ⟦main/1/corpo/0⟧⟦main/1/corpo/0/alvo⟧$v[$i]⟦/⟧ = (int) trim(fgets(STDIN));⟦/⟧
}⟦/⟧
⟦main/2⟧⟦main/2/alvo⟧$maior⟦/⟧ = ⟦main/2/valor⟧$v[0]⟦/⟧;⟦/⟧
⟦main/3⟧for (⟦main/3/var⟧$i⟦/⟧ = ⟦main/3/de⟧1⟦/⟧; $i <= ⟦main/3/ate⟧4⟦/⟧; $i++) {
    ⟦main/3/corpo/0⟧if (⟦main/3/corpo/0/cond⟧$v[$i] > $maior⟦/⟧) {
        ⟦main/3/corpo/0/entao/0⟧$maior = $v[$i];⟦/⟧
    }⟦/⟧
}⟦/⟧
⟦main/4⟧echo ⟦main/4/0⟧"Maior: "⟦/⟧ . ⟦main/4/1⟧$maior⟦/⟧ . "\n";⟦/⟧
