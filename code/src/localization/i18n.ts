import i18n, { TOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './languages';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
});


export default i18n;

export function t(
    key: any,
    options?: string | TOptions,
) {
    //@ts-expect-error // Fix types later
    return i18n.t(key, options);
}