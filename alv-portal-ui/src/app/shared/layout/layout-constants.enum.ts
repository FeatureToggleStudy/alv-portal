/**
 * Here we define commonly used layout constants.
 * NOTICE: 1rem = 16px
 */
export enum LayoutConstants {
  /**
   * Used to position the sticky side panels on the search pages (candidate, job ad).
   * This value equals to the distance from top of the <main> element.
   * Calculation: padding-top + padding-bottom + height of the input = 142px
   *              3rem        + 3rem           + 46px                = 142px
   *              48px        + 48px           + 46px                = 142px
   */
  STICKY_TOP_SEARCH = 0,

  /**
   * Used to position the sticky side panels on the detail pages (candidate, job ad)
   * This value equals to the distance from top of the <main> element.
   * Calculation: padding-top = 24px
   *              1.5rem      = 24px
   */
  STICKY_TOP_DETAIL = 24,

  /**
   * Used to scroll the last visited element into the view. This value has to be negative
   * to make the browser scroll down and slightly higher than STICKY_TOP_SEARCH to have it
   * scrolled naturally (not exactly) into the view.
   * Scrolling always happens in pixels, so no unit is needed.
   */
  SCROLL_Y_SEARCH = -140
}
