import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String nome = "";
        String saudacao = "";

        System.out.println("Qual e o seu nome?");
        nome = sc.nextLine();
        saudacao = "Ola, " + nome + "!";
        System.out.println(saudacao);
        System.out.println("Seu nome tem " + nome.length() + " caracteres");
        System.out.println("Progresso: 100%");
        if (nome.equals("fim")) {
            System.out.println("Ate logo");
        } else {
            System.out.println("Bem-vindo");
        }
    }
}
