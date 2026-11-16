⟦syn:java.imports⟧import java.util.Scanner;⟦/⟧

⟦syn:java.class_main⟧public class Main {⟦/⟧
    ⟦prog:inicio⟧public static void main(String[] args) {⟦/⟧
        ⟦syn:java.scanner⟧Scanner sc = new Scanner(System.in);⟦/⟧
        ⟦var/0⟧int n = 0;⟦/⟧

        ⟦main/0⟧System.out.println(⟦main/0/0⟧"Contar a partir de:"⟦/⟧);⟦/⟧
        ⟦main/1⟧⟦main/1/alvo⟧n⟦/⟧ = Integer.parseInt(sc.nextLine().trim());⟦/⟧
        ⟦main/2⟧while (⟦main/2/cond⟧n > 0⟦/⟧) {
            ⟦main/2/corpo/0⟧System.out.println(⟦main/2/corpo/0/0⟧n⟦/⟧);⟦/⟧
            ⟦main/2/corpo/1⟧⟦main/2/corpo/1/alvo⟧n⟦/⟧ = ⟦main/2/corpo/1/valor⟧n - 1⟦/⟧;⟦/⟧
        }⟦/⟧
        ⟦main/3⟧System.out.println(⟦main/3/0⟧"Fogo!"⟦/⟧);⟦/⟧
    ⟦prog:inicio⟧}⟦/⟧
⟦syn:java.class_main⟧}⟦/⟧
