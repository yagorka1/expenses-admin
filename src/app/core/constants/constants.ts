export class Constants {
  static readonly HTTP_CODE_401 = 401;

  static readonly STORAGE_AUTH_TOKEN = 'token';
  static readonly MESSAGE_COPIED_TO_CLIPBOARD = 'Copied to clipboard';
  static readonly STORAGE_AUTH_REFRESH_TOKEN = 'refresh_token';

  static readonly GLOBAL_INFO_DURATION = 3000;
  static readonly GLOBAL_ERROR_DURATION = 10000;
  static readonly DEFAULT_DEBOUNCE_TIME = 300;
  static readonly AUTOFOCUS_DEBOUNCE_TIME = 500;

  static readonly FORM_INPUT_LENGTH_MAX = 255;
  static readonly FORM_TEXT_AREA_DEFAULT_LENGTH_MAX = 255;
  static readonly FORM_FIELD_DEFAULT_LENGTH_MAX = 50;
  static readonly FORM_PASSWORD_LENGTH_MIN = 8;
  static readonly FORM_INPUT_LENGTH_MIN = 3;
  static readonly FORM_PASSWORD_LENGTH_MAX = 32;
  static readonly FORM_EMAIL_LENGTH_MAX = 254;

  static readonly CURRENCY_DECIMAL_PLACES_DEFAULT = 2;
  static readonly CURRENCY_MIN_VALUE = 0.01;

  static readonly CRYPTO_FRACTION_DIGITS = 5;
}
