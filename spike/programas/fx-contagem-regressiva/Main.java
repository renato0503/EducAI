import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = 0;

        System.out.println("Contar a partir de:");
        n = Integer.parseInt(sc.nextLine().trim());
        while (n > 0) {
            System.out.println(n);
            n = n - 1;
        }
        System.out.println("Fogo!");
    }
}
