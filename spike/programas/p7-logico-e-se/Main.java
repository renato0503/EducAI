import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = 0;
        int b = 0;
        boolean x = false;
        boolean y = false;

        a = Integer.parseInt(sc.nextLine().trim());
        b = Integer.parseInt(sc.nextLine().trim());
        x = (a > 0) && (b > 0);
        y = (a > 10) || !(b > 10);
        System.out.println("ambos positivos? " + (x ? "verdadeiro" : "falso"));
        System.out.println("y? " + (y ? "verdadeiro" : "falso"));
        if (x) {
            if (a > b) {
                System.out.println("a maior");
            } else {
                if (a == b) {
                    System.out.println("iguais");
                } else {
                    System.out.println("b maior");
                }
            }
        } else {
            System.out.println("algum nao positivo");
        }
        if ((b != 0) && (a / b > 1)) {
            System.out.println("a e mais que o dobro de b");
        }
    }
}
