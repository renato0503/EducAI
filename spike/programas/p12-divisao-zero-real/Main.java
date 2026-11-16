import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = 0;
        int b = 0;
        double x = 0.0;

        a = Integer.parseInt(sc.nextLine().trim());
        b = Integer.parseInt(sc.nextLine().trim());
        x = (double) a / b;
        System.out.println("real: " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
    }
}
