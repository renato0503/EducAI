public class Main {
    public static void main(String[] args) {
        int i = 0;
        int soma = 0;

        soma = 0;
        for (i = 1; i <= 3; i++) {
            soma = soma + i;
        }
        System.out.println("soma: " + soma);
        System.out.println("i depois do laco: " + i);
    }
}
