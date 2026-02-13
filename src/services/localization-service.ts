import { translations, type TranslationKey } from "./translations"

export type Language = 'en' | 'nl' | 'de' | 'fr'

export class LocalizationService {
  //#region Fields
  private currentLanguage: Language = 'en'
  //#endregion Fields

  //#region Public Methods
  public setLanguage(language: Language): void {
    this.currentLanguage = language
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage
  }

  public translate(key: string): string {
    const translation = translations[key as TranslationKey]
    if (!translation) {
      return key
    }
    return translation[this.currentLanguage] || key
  }

  public t(key: string): string {
    return this.translate(key)
  }
  //#endregion Public Methods
}

export const l10n = new LocalizationService()
