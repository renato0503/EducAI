import java.util.Scanner;

public class Main {
    static int fatorial(int k) {
        int i = 0;
        int resultado = 0;
        resultado = 1;
        for (i = 2; i <= k; i++) {
            resultado = resultado * i;
        }
        return resultado;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = 0;

        System.out.println("Calcular o fatorial de:");
        n = Integer.parseInt(sc.nextLine().trim());
        System.out.println(n + "! = " + fatorial(n));
    }
}
