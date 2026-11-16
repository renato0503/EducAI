#include <stdio.h>

int main(void) {
    double x = 0.0;

    x = 0.125;
    printf("0.125 -> %.2f\n", x);
    x = 0.375;
    printf("0.375 -> %.2f\n", x);
    x = 2.675;
    printf("2.675 -> %.2f\n", x);
    x = 1.005;
    printf("1.005 -> %.2f\n", x);
    x = 1234.5678;
    printf("1234.5678 -> %.2f\n", x);
    x = -2.675;
    printf("-2.675 -> %.2f\n", x);
    x = 0.0;
    printf("0.0 -> %.2f\n", x);
    x = -0.001;
    printf("-0.001 -> %.2f\n", x);
    x = 2.5;
    printf("2.5 com 0 casas -> %.0f\n", x);
    x = 3.5;
    printf("3.5 com 0 casas -> %.0f\n", x);
    x = 0.1 + 0.2;
    printf("0.1 + 0.2 com 3 casas -> %.3f\n", x);
    return 0;
}
