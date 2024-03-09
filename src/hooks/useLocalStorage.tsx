import { parse } from "path";
import { useEffect, useState } from "react";
const getLocalValue = (key, initValue) => {
  // SSR NEXT.JS
  if (typeof window === "undefined") return initValue;

  //result of a function
  if (initValue instanceof Function) return initValue();

  // if a value is already stored
  const localValue = localStorage.getItem(key);
  if (localValue) return localValue;

  return initValue;
};
function isStringifiedJSON(data: any) {
  try {
    const parsedData = JSON.parse(data);
    console.log({ parsedData });
    return parsedData;
  } catch (error) {
    console.log({ data });
    return data;
  }
}
const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return isStringifiedJSON(getLocalValue(key, initValue));
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
export default useLocalStorage;
