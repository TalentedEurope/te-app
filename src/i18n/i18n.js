import I18n from 'react-native-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import sk from './locales/sk.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  es,
  de,
  fr,
  it,
  sk,
};

export default I18n;
