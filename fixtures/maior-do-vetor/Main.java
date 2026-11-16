⟦syn:java.imports⟧import java.util.Scanner;⟦/⟧

⟦syn:java.class_main⟧public class Main {⟦/⟧
    ⟦prog:inicio⟧public static void main(String[] args) {⟦/⟧
        ⟦syn:java.scanner⟧Scanner sc = new Scanner(System.in);⟦/⟧
        ⟦var/0⟧int[] v = new int[5];⟦/⟧
        ⟦var/1⟧int i = 0;
        int maior = 0;⟦/⟧

        ⟦main/0⟧System.out.println(⟦main/0/0⟧"Digite 5 numeros:"⟦/⟧);⟦/⟧
        ⟦main/1⟧for (⟦main/1/var⟧i⟦/⟧ = ⟦main/1/de⟧0⟦/⟧; i <= ⟦main/1/ate⟧4⟦/⟧; i++) {
            ⟦main/1/corpo/0⟧⟦main/1/corpo/0/alvo⟧v[i]⟦/⟧ = Integer.parseInt(sc.nextLine().trim());⟦/⟧
        }⟦/⟧
        ⟦main/2⟧⟦main/2/alvo⟧maior⟦/⟧ = ⟦main/2/valor⟧v[0]⟦/⟧;⟦/⟧
        ⟦main/3⟧for (⟦main/3/var⟧i⟦/⟧ = ⟦main/3/de⟧1⟦/⟧; i <= ⟦main/3/ate⟧4⟦/⟧; i++) {
            ⟦main/3/corpo/0⟧if (⟦main/3/corpo/0/cond⟧v[i] > maior⟦/⟧) {
                ⟦main/3/corpo/0/entao/0⟧maior = v[i];⟦/⟧
            }⟦/⟧
        }⟦/⟧
        ⟦main/4⟧System.out.println(⟦main/4/0⟧"Maior: "⟦/⟧ + ⟦main/4/1⟧maior⟦/⟧);⟦/⟧
    ⟦prog:inicio⟧}⟦/⟧
⟦syn:java.class_main⟧}⟦/⟧
