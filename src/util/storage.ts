import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

export const setItem = async (key: string, value: any) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  await Storage.set({
    key,
    value: value
  });
};

export const getItem = async (key: string) => {
  const result = await Storage.get({ key });
  return result.value === null ? undefined : JSON.parse(result.value)
};

export const getItems = async (keyFragment: string): Promise<any[]> => {
  const allKeys = await Storage.keys();
  const itemKeys = allKeys.keys.filter(k => k.includes(keyFragment));
  return await Promise.all(
    itemKeys.map(async k => {
      let item = await Storage.get({ key: k });
      return item.value === null ? {} : JSON.parse(item.value);
    })
  );
};

export const removeItem = async (key: string) => {
  await Storage.remove({ key });
};

export const keys = async () => {
  return await Storage.keys();
};

export const clear = async () => {
  await Storage.clear();
};
