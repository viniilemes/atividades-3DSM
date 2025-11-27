export function isValidCPF(value: string): boolean {
    if (!value || typeof value !== 'string') return false;
    const cpf = value.replace(/[\D]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    const numbers = cpf.split('').map(d => parseInt(d, 10));
    const calc = (count: number) => {
        let sum = 0;
        for (let i = 0; i < count - 1; i++) {
            sum += numbers[i] * (count - i);
        }
        const result = (sum * 10) % 11;
        return result === 10 ? 0 : result;
    };
    const digit1 = calc(10);
    const digit2 = calc(11);
    return digit1 === numbers[9] && digit2 === numbers[10];
}
