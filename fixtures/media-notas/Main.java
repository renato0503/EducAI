⟦syn:java.imports⟧import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;⟦/⟧

⟦syn:java.class_main⟧public class Main {⟦/⟧
    ⟦prog:inicio⟧public static void main(String[] args) {⟦/⟧
        ⟦syn:java.scanner⟧Scanner sc = new Scanner(System.in);⟦/⟧
        ⟦var/0⟧double n1 = 0.0;
        double n2 = 0.0;
        double n3 = 0.0;
        double n4 = 0.0;
        double media = 0.0;⟦/⟧

        ⟦main/0⟧System.out.println(⟦main/0/0⟧"Digite as 4 notas:"⟦/⟧);⟦/⟧
        ⟦main/1⟧⟦main/1/alvo⟧n1⟦/⟧ = Double.parseDouble(sc.nextLine().trim());⟦/⟧
        ⟦main/2⟧⟦main/2/alvo⟧n2⟦/⟧ = Double.parseDouble(sc.nextLine().trim());⟦/⟧
        ⟦main/3⟧⟦main/3/alvo⟧n3⟦/⟧ = Double.parseDouble(sc.nextLine().trim());⟦/⟧
        ⟦main/4⟧⟦main/4/alvo⟧n4⟦/⟧ = Double.parseDouble(sc.nextLine().trim());⟦/⟧
        ⟦main/5⟧⟦main/5/alvo⟧media⟦/⟧ = ⟦main/5/valor⟧(⟦main/5/valor/esq⟧n1 + n2 + n3 + n4⟦/⟧) / 4⟦/⟧;⟦/⟧
        ⟦main/6⟧System.out.println(⟦main/6/0⟧"Media: "⟦/⟧ + ⟦main/6/1⟧new BigDecimal(media).setScale(2, RoundingMode.HALF_EVEN).toPlainString()⟦/⟧);⟦/⟧
        ⟦main/7⟧if (⟦main/7/cond⟧media >= 7⟦/⟧) {
            ⟦main/7/entao/0⟧System.out.println("Aprovado");⟦/⟧
        } else {
            ⟦main/7/senao/0⟧System.out.println("Reprovado");⟦/⟧
        }⟦/⟧
    ⟦prog:inicio⟧}⟦/⟧
⟦syn:java.class_main⟧}⟦/⟧
