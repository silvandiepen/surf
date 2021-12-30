export const getTitle = (str: string): string => {
  return str
    .split("\n")
    .find((line) => line.startsWith("# "))
    .replace("# ", "");
};

export const removeTitle = (str: string): string =>
  str.replace(
    str.split("\n").find((line) => line.startsWith("# ")),
    ""
  );

export const getId = (str: string): string => str.replace(".md", "");

export const getName = (str: string): string =>
  str.replace(".md", "").split("-").slice(1).join("-");

export const getDateFromFilename = (str: string): Date => {
  const dateString = str.split("-")[0];

  const date = new Date(
    parseInt(dateString.substring(0, 4)),
    parseInt(dateString.substring(4, 6)),
    parseInt(dateString.substring(6, 8)),
    parseInt(dateString.substring(8, 10)),
    parseInt(dateString.substring(10, 12)),
    parseInt(
      isNaN(parseInt(dateString.substring(12, 14)))
        ? "00"
        : dateString.substring(12, 14)
    )
  );
  return date;
};
export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number, og: T[]) => void
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const hashCode = (str: string | string[]): number => {
  if (typeof str == "object") str = str.join("-");

  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
