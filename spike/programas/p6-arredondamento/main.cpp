#include <iomanip>
#include <iostream>

int main() {
    double x = 0.0;

    x = 0.125;
    std::cout << "0.125 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = 0.375;
    std::cout << "0.375 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = 2.675;
    std::cout << "2.675 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = 1.005;
    std::cout << "1.005 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = 1234.5678;
    std::cout << "1234.5678 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = -2.675;
    std::cout << "-2.675 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = 0.0;
    std::cout << "0.0 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = -0.001;
    std::cout << "-0.001 -> " << std::fixed << std::setprecision(2) << x << "\n";
    x = 2.5;
    std::cout << "2.5 com 0 casas -> " << std::fixed << std::setprecision(0) << x << "\n";
    x = 3.5;
    std::cout << "3.5 com 0 casas -> " << std::fixed << std::setprecision(0) << x << "\n";
    x = 0.1 + 0.2;
    std::cout << "0.1 + 0.2 com 3 casas -> " << std::fixed << std::setprecision(3) << x << "\n";
    return 0;
}
