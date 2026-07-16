/**
 * Strict types for /menetelma page configuration.
 *
 * Each site exports a `MethodologyConfig` from
 * `src/content/methodology.config.ts` and feeds it into
 * `<MethodologyPage config={...} />`.
 *
 * Constraints:
 * - No external Git/changelog repo link (changelog is inline)
 * - No named contact person (contact.href is a generic route or mailto)
 * - No per-card "Mainos" labels — site-wide disclosure lives here
 */

/** ISO-8601 date string, e.g. "2026-06-04". */
export type IsoDate = string;

/** Coarse categorization of a data source. */
export type DataSourceType =
  /** Government / regulator / official statistics agency. */
  | 'Viranomainen'
  /** Industry association or self-regulatory body. */
  | 'Toimialajärjestö'
  /** Third-party measurement / benchmarking. */
  | 'Mittausdata'
  /** Independent survey or research institute. */
  | 'Tutkimus'
  /** Public market data (e.g. ENTSO-E). */
  | 'Markkinadata'
  /** First-party scraping / verification (use sparingly). */
  | 'Oma seuranta';

export interface DataSource {
  /** Display name, e.g. "Suomen Pankki — RATI Open Data". */
  readonly name: string;
  /** Source category for UI tagging. */
  readonly type: DataSourceType;
  /**
   * Human-readable refresh cadence in Finnish,
   * e.g. "Päivittäin", "Kuukausittain", "Kvartaaleittain".
   */
  readonly refreshCadence: string;
  /** Public URL. Optional — internal-only sources omit this. */
  readonly url?: string;
  /** 1-2 sentence Finnish description of what we use from this source. */
  readonly description?: string;
}

export interface CriterionRow {
  /** Short Finnish label, e.g. "Kuukausihinta". */
  readonly factor: string;
  /** 1 sentence explaining what is measured. */
  readonly description: string;
  /**
   * The criterion's role in ordering, e.g. "Oletusjärjestys",
   * "Vain tiedoksi" or "Kelpoisuusehto". Ordering is by the price
   * metric — there is no weighted composite score, so criteria carry a
   * role rather than a numeric weight.
   */
  readonly role: string;
}

export interface Disclosure {
  /** Opening paragraph explaining commercial relationships in plain terms. */
  readonly intro: string;
  /**
   * Optional explanation of how affiliate links/partnerships function in
   * practice (e.g. CPC, CPA, fixed-fee). Keep generic and audience-friendly.
   */
  readonly howItWorks?: string;
  /**
   * Bullet points describing the safeguards that keep ranking independent
   * of commercial relationships. Min. 3 recommended.
   */
  readonly safeguards: ReadonlyArray<string>;
}

export interface ChangelogEntry {
  /** ISO-8601 date the change took effect. */
  readonly date: IsoDate;
  /** Short Finnish title, e.g. "Hinnan paino nostettu 55 %:sta 60 %:iin". */
  readonly title: string;
  /** 1-2 sentence rationale for the change. */
  readonly summary: string;
}

export interface ContactLink {
  /**
   * Internal route (e.g. "/yhteys") or mailto link
   * (e.g. "mailto:feedback@valitselaina.fi").
   * Never use a named person.
   */
  readonly href: string;
  /** CTA label in Finnish, e.g. "Lähetä palautetta". */
  readonly label: string;
}

export interface MethodologyConfig {
  /** Display name of the site, e.g. "Valitse Sähkö". */
  readonly siteName: string;
  /** Canonical site URL incl. protocol, e.g. "https://valitsesahko.fi". */
  readonly siteUrl: string;
  /** 2-3 paragraphs forming the executive summary. */
  readonly summary: ReadonlyArray<string>;
  /** Authoritative sources used in ranking. */
  readonly dataSources: ReadonlyArray<DataSource>;
  /**
   * Criteria we evaluate and each one's role in ordering. Ordering is by
   * the default price metric — there is no weighted composite score.
   */
  readonly criteria: ReadonlyArray<CriterionRow>;
  /** Site-wide commercial disclosure copy. */
  readonly disclosure: Disclosure;
  /**
   * Inline change log, newest first. UI sorts by array order (do not rely
   * on date sorting — array order is the source of truth).
   */
  readonly changelog: ReadonlyArray<ChangelogEntry>;
  /** Generic contact link (no named person). */
  readonly contact: ContactLink;
  /**
   * Optional public machine-readable data feed advertised on the page
   * (e.g. the JSON comparison feed) — renders as a download link under
   * the data sources.
   */
  readonly dataFeed?: {
    readonly href: string;
    readonly label: string;
    readonly description: string;
  };
  /**
   * Optional ISO date of the most recent editorial review of this page.
   * Surfaces as "Viimeksi tarkistettu DD.MM.YYYY" in the hero.
   */
  readonly lastReviewedAt?: IsoDate;
}