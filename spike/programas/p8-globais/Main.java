public class Main {
    static int total = 0;
    static int i = 0;

    static void somar(int valor) {
        total = total + valor;
    }

    static int dobroDoTotal() {
        return total * 2;
    }

    public static void main(String[] args) {
        total = 0;
        for (i = 1; i <= 4; i++) {
            somar(i * 10);
        }
        System.out.println("total: " + total);
        System.out.println("dobro: " + dobroDoTotal());
    }
}
