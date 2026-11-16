import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        double x = 0.0;

        x = 0.125;
        System.out.println("0.125 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = 0.375;
        System.out.println("0.375 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = 2.675;
        System.out.println("2.675 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = 1.005;
        System.out.println("1.005 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = 1234.5678;
        System.out.println("1234.5678 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = -2.675;
        System.out.println("-2.675 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = 0.0;
        System.out.println("0.0 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = -0.001;
        System.out.println("-0.001 -> " + new BigDecimal(x).setScale(2, RoundingMode.HALF_EVEN).toPlainString());
        x = 2.5;
        System.out.println("2.5 com 0 casas -> " + new BigDecimal(x).setScale(0, RoundingMode.HALF_EVEN).toPlainString());
        x = 3.5;
        System.out.println("3.5 com 0 casas -> " + new BigDecimal(x).setScale(0, RoundingMode.HALF_EVEN).toPlainString());
        x = 0.1 + 0.2;
        System.out.println("0.1 + 0.2 com 3 casas -> " + new BigDecimal(x).setScale(3, RoundingMode.HALF_EVEN).toPlainString());
    }
}
