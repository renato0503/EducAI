import java.util.Scanner;

public class Main {
    static void dobrar(int[] w) {
        int j = 0;
        for (j = 0; j <= 4; j++) {
            w[j] = w[j] * 2;
        }
    }

    static int soma(int[] w) {
        int j = 0;
        int total = 0;
        total = 0;
        for (j = 0; j <= 4; j++) {
            total = total + w[j];
        }
        return total;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] v = new int[5];
        int i = 0;

        for (i = 0; i <= 4; i++) {
            v[i] = Integer.parseInt(sc.nextLine().trim());
        }
        dobrar(v);
        for (i = 4; i >= 0; i--) {
            System.out.print(v[i] + " ");
        }
        System.out.println();
        System.out.println("Soma: " + soma(v));
    }
}
