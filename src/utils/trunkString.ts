export const trunkString = (str: string, cap: number) => {
  if (!str.length) return;

  return str.length < cap ? str : str.slice(0, cap - 3) + "...";
};
