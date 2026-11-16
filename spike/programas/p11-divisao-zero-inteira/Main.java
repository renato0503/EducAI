import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = 0;
        int b = 0;

        a = Integer.parseInt(sc.nextLine().trim());
        b = Integer.parseInt(sc.nextLine().trim());
        System.out.println("inteira: " + (a / b));
    }
}
