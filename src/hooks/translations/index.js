import { useTranslation } from 'react-i18next';

export const useTranslations = (page) => {
  const { t } = useTranslation();
  return t(page, { returnObjects: true });
};