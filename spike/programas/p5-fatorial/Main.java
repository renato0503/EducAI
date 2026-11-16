import java.util.Scanner;

public class Main {
    static int fat(int k) {
        if (k <= 1) {
            return 1;
        } else {
            return k * fat(k - 1);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = 0;
        int i = 0;

        n = Integer.parseInt(sc.nextLine().trim());
        for (i = 1; i <= n; i++) {
            System.out.println(i + "! = " + fat(i));
        }
    }
}
