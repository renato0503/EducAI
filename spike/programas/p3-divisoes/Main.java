import java.util.Locale;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = 0;
        int b = 0;
        double x = 0.0;
        boolean par = false;

        a = Integer.parseInt(sc.nextLine().trim());
        b = Integer.parseInt(sc.nextLine().trim());
        System.out.println(a + " / " + b + " = " + String.format(Locale.ROOT, "%.2f", (double) a / b));
        System.out.println(a + " div " + b + " = " + (a / b));
        System.out.println(a + " mod " + b + " = " + (a % b));
        par = a % 2 == 0;
        System.out.println("a e par? " + (par ? "verdadeiro" : "falso"));
        x = 0.125;
        System.out.println("0.125 com 2 casas: " + String.format(Locale.ROOT, "%.2f", x));
        x = 2.675;
        System.out.println("2.675 com 2 casas: " + String.format(Locale.ROOT, "%.2f", x));
        x = 0.1 + 0.2;
        System.out.println("0.1 + 0.2 = " + String.format(Locale.ROOT, "%.2f", x));
    }
}
