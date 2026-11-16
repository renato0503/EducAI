import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double n1 = 0.0;
        double n2 = 0.0;
        double n3 = 0.0;
        double n4 = 0.0;
        double media = 0.0;

        System.out.println("Digite as 4 notas:");
        n1 = Double.parseDouble(sc.nextLine().trim());
        n2 = Double.parseDouble(sc.nextLine().trim());
        n3 = Double.parseDouble(sc.nextLine().trim());
        n4 = Double.parseDouble(sc.nextLine().trim());
        media = (n1 + n2 + n3 + n4) / 4;
        System.out.println("Media: " + new BigDecimal(media).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        if (media >= 7) {
            System.out.println("Aprovado");
        } else {
            System.out.println("Reprovado");
        }
    }
}
