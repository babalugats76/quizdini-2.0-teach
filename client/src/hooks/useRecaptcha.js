import { useEffect, useMemo } from "react";
import { useScript } from "/";

export default function useRecaptcha({ url, sitekey, htmlElement }) {
  const { promise, resolve } = useMemo(createPromiseResolver, [htmlElement, sitekey]);
  useScript(url, {
    onload: () =>
      window.grecaptcha.ready(() => {
        resolve(window.grecaptcha);
      })
  });
  useEffect(() => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha);
    }
  }, [resolve]);

  const render = async () => {
    const grecaptcha = await promise;
    return grecaptcha.render(htmlElement, { sitekey });
  };

  const reset = async widgitId => {
    const grecaptcha = await promise;
    return grecaptcha.reset(widgitId);
  };

  return [render, reset];
}

const createPromiseResolver = () => {
  let resolve = () => {};
  const promise = new Promise(r => {
    resolve = r;
  });
  return { resolve, promise };
};
