⟦syn:php.open_tag⟧<?php⟦/⟧

⟦var/0⟧$n1 = 0.0;
$n2 = 0.0;
$n3 = 0.0;
$n4 = 0.0;
$media = 0.0;⟦/⟧

⟦main/0⟧echo ⟦main/0/0⟧"Digite as 4 notas:\n"⟦/⟧;⟦/⟧
⟦main/1⟧⟦main/1/alvo⟧$n1⟦/⟧ = (float) trim(fgets(STDIN));⟦/⟧
⟦main/2⟧⟦main/2/alvo⟧$n2⟦/⟧ = (float) trim(fgets(STDIN));⟦/⟧
⟦main/3⟧⟦main/3/alvo⟧$n3⟦/⟧ = (float) trim(fgets(STDIN));⟦/⟧
⟦main/4⟧⟦main/4/alvo⟧$n4⟦/⟧ = (float) trim(fgets(STDIN));⟦/⟧
⟦main/5⟧⟦main/5/alvo⟧$media⟦/⟧ = ⟦main/5/valor⟧(⟦main/5/valor/esq⟧$n1 + $n2 + $n3 + $n4⟦/⟧) / 4⟦/⟧;⟦/⟧
⟦main/6⟧printf("⟦main/6/0⟧Media: ⟦/⟧⟦main/6/1⟧%.2F⟦/⟧\n", ⟦main/6/1⟧$media⟦/⟧);⟦/⟧
⟦main/7⟧if (⟦main/7/cond⟧$media >= 7⟦/⟧) {
    ⟦main/7/entao/0⟧echo "Aprovado\n";⟦/⟧
} else {
    ⟦main/7/senao/0⟧echo "Reprovado\n";⟦/⟧
}⟦/⟧
