⟦syn:java.imports⟧import java.util.Scanner;⟦/⟧

⟦syn:java.class_main⟧public class Main {⟦/⟧
    ⟦f0⟧⟦f0:assinatura⟧static int fatorial(⟦f0/param/0⟧int k⟦/⟧)⟦/⟧ {
        ⟦f0/var/0⟧int i = 0;
        int resultado = 0;⟦/⟧
        ⟦f0/0⟧resultado = 1;⟦/⟧
        ⟦f0/1⟧for (⟦f0/1/var⟧i⟦/⟧ = ⟦f0/1/de⟧2⟦/⟧; i <= ⟦f0/1/ate⟧k⟦/⟧; i++) {
            ⟦f0/1/corpo/0⟧resultado = ⟦f0/1/corpo/0/valor⟧resultado * i⟦/⟧;⟦/⟧
        }⟦/⟧
        ⟦f0/2⟧return resultado;⟦/⟧
    }⟦/⟧

    ⟦prog:inicio⟧public static void main(String[] args) {⟦/⟧
        ⟦syn:java.scanner⟧Scanner sc = new Scanner(System.in);⟦/⟧
        ⟦var/0⟧int n = 0;⟦/⟧

        ⟦main/0⟧System.out.println(⟦main/0/0⟧"Calcular o fatorial de:"⟦/⟧);⟦/⟧
        ⟦main/1⟧⟦main/1/alvo⟧n⟦/⟧ = Integer.parseInt(sc.nextLine().trim());⟦/⟧
        ⟦main/2⟧System.out.println(⟦main/2/0⟧n⟦/⟧ + "! = " + ⟦main/2/2⟧fatorial(n)⟦/⟧);⟦/⟧
    ⟦prog:inicio⟧}⟦/⟧
⟦syn:java.class_main⟧}⟦/⟧
