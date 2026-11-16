import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] v = new int[5];
        int i = 0;
        int maior = 0;

        System.out.println("Digite 5 numeros:");
        for (i = 0; i <= 4; i++) {
            v[i] = Integer.parseInt(sc.nextLine().trim());
        }
        maior = v[0];
        for (i = 1; i <= 4; i++) {
            if (v[i] > maior) {
                maior = v[i];
            }
        }
        System.out.println("Maior: " + maior);
    }
}
