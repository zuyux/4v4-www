// utils/addressUtils.ts

export const shortenAddress = (address: string, chars = 4): string => {
    if (!address) {
      return "";
    }
    return `<span class="math-inline">\{address\.substring\(0, chars \+ 2\)\}\.\.\.</span>{address.substring(address.length - chars)}`;
  };