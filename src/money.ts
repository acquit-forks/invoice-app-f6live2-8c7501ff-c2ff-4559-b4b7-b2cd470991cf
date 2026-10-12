export type Line = { amount: number };

/**
 * ISO 4217 "Exponent" (minor unit) values that differ from 2.
 *
 * ISO 4217 defines, for every currency, the number of digits after the
 * decimal separator (the minor unit, a.k.a. the exponent). Most active
 * currencies have exponent 2; the exceptions below are the complete set,
 * taken from the ISO 4217 currency tables:
 *
 * - Exponent 0 (no minor unit): BIF, CLP, DJF, GNF, ISK, JPY, KMF, KRW,
 *   PYG, RWF, UGX, UYI, VND, VUV, XAF, XOF, XPF
 * - Exponent 3: BHD, IQD, JOD, KWD, LYD, OMR, TND
 * - Exponent 4: CLF
 *
 * Any active ISO 4217 currency not listed here is defined by the standard
 * with exponent 2, so the fallback below matches the standard for every
 * remaining case rather than being a guess.
 */
const ISO_4217_NON_2_EXPONENTS: Record<string, number> = {
  // Exponent 0 — currencies with no minor unit
  BIF: 0,
  CLP: 0,
  DJF: 0,
  GNF: 0,
  ISK: 0,
  JPY: 0,
  KMF: 0,
  KRW: 0,
  PYG: 0,
  RWF: 0,
  UGX: 0,
  UYI: 0,
  VND: 0,
  VUV: 0,
  XAF: 0,
  XOF: 0,
  XPF: 0,
  // Exponent 3
  BHD: 3,
  IQD: 3,
  JOD: 3,
  KWD: 3,
  LYD: 3,
  OMR: 3,
  TND: 3,
  // Exponent 4
  CLF: 4,
};

/**
 * Returns the ISO 4217 minor-unit exponent for a currency code, i.e. the
 * number of decimal places amounts in that currency are denominated to.
 * Unknown codes are not defined by ISO 4217 and fall back to 2, the most
 * common exponent.
 */
export function currencyExponent(currency: string): number {
  const code = currency.trim().toUpperCase();
  return ISO_4217_NON_2_EXPONENTS[code] ?? 2;
}

export function formatTotal(lines: Line[], currency: string): string {
  const exponent = currencyExponent(currency);
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  // Round to the currency's own minor unit, not a fixed two decimals.
  return sum.toFixed(exponent);
}
