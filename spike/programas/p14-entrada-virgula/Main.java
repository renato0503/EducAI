import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double x = 0.0;

        x = Double.parseDouble(sc.nextLine().trim());
        System.out.println("x: " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
    }
}
