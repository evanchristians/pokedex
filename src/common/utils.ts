export const padleft = (str: string, len: number, ch: string) => {
  return str.length >= len
    ? str
    : new Array(len - str.length + 1).join(ch) + str;
};
