import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = 0;
        int i = 0;
        double nota = 0.0;
        double soma = 0.0;
        double media = 0.0;

        System.out.println("Quantas notas?");
        n = Integer.parseInt(sc.nextLine().trim());
        soma = 0;
        for (i = 1; i <= n; i++) {
            System.out.println("Nota " + i + ":");
            nota = Double.parseDouble(sc.nextLine().trim());
            soma = soma + nota;
        }
        media = soma / n;
        System.out.println("Media: " + String.format(Locale.ROOT, "%.2f", media));
        System.out.println("Media com 1 casa: " + String.format(Locale.ROOT, "%.1f", media));
        if (media >= 7) {
            System.out.println("Aprovado");
        } else {
            System.out.println("Reprovado");
        }
    }
}
