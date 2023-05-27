import CRC32 from "crc-32";

export const hash = (object: any) => {
  const seen = new Set<any>();
  const json = JSON.stringify(object, function (key, value) {
    if (typeof value === "function") {
      return value.displayName ?? value.name;
    } else if (seen.has(this)) {
      return "#CircularReference";
    }
    seen.add(this);
    return value;
  });
  return CRC32.str(json).toString(16);
};
