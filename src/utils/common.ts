import i18next from 'i18next';
import { ObjectId } from 'mongodb';

class Common {
  static mongoSanitize = (param: any) => {
    if (param instanceof Object) {
      for (const key in param) {
        if (/^\$/.test(key)) {
          delete param[key];
        }
      }
    }
    return param;
  };
  static getId = (id: string) => {
    return new ObjectId(id);
  };
  static newId = () => {
    return new ObjectId();
  };
  static translate = (key: string, lang = "en", options: any) => {
    return i18next.t(key, { lng: lang, ...options });
  };
}
export { Common };