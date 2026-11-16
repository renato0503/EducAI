import java.util.Scanner;

public class Main {
    static int soma(int k) {
        if (k == 0) {
            return 0;
        } else {
            return k + soma(k - 1);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = 0;

        n = Integer.parseInt(sc.nextLine().trim());
        System.out.println("soma: " + soma(n));
    }
}
