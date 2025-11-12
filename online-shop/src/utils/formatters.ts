export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const randomPastDate = () => {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - Math.floor(Math.random() * 5));
  past.setMonth(Math.floor(Math.random() * 12));
  past.setDate(Math.floor(Math.random() * 28) + 1);
  const formatted = past.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formatted;
};
