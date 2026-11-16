import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nome = "";

        nome = sc.nextLine();
        System.out.println("Ola, " + nome + "!");
        System.out.println("tamanho: " + nome.length());
    }
}
