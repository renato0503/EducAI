⟦syn:java.imports⟧import java.util.Scanner;⟦/⟧

⟦syn:java.class_main⟧public class Main {⟦/⟧
    ⟦prog:inicio⟧public static void main(String[] args) {⟦/⟧
        ⟦syn:java.scanner⟧Scanner sc = new Scanner(System.in);⟦/⟧
        ⟦var/0⟧int n = 0;
        int i = 0;⟦/⟧

        ⟦main/0⟧System.out.println(⟦main/0/0⟧"Tabuada de qual numero?"⟦/⟧);⟦/⟧
        ⟦main/1⟧⟦main/1/alvo⟧n⟦/⟧ = Integer.parseInt(sc.nextLine().trim());⟦/⟧
        ⟦main/2⟧for (⟦main/2/var⟧i⟦/⟧ = ⟦main/2/de⟧1⟦/⟧; i <= ⟦main/2/ate⟧10⟦/⟧; i++) {
            ⟦main/2/corpo/0⟧System.out.println(⟦main/2/corpo/0/0⟧n⟦/⟧ + " x " + ⟦main/2/corpo/0/2⟧i⟦/⟧ + " = " + (⟦main/2/corpo/0/4⟧n * i⟦/⟧));⟦/⟧
        }⟦/⟧
    ⟦prog:inicio⟧}⟦/⟧
⟦syn:java.class_main⟧}⟦/⟧
