export const formatToUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // puedes cambiar a 2 si quieres mostrar centavos
  }).format(amount);
};