export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
  });

  return formatter.format(price);
};
