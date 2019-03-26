/**
 * Here we define commonly used layout constants.
 * NOTICE: 1rem = 16px
 */
export enum LayoutConstants {
  /**
   * Used to position the sticky side panels on the search pages (candidate, job ad).
   * This value equals to the distance from top of the <body> element.
   * Calculation: header height = 53px
   */
  STICKY_TOP_SEARCH = 53,

  /**
   * Used to position the sticky side panels on the detail pages (candidate, job ad)
   * This value equals to the distance from top of the <body> element.
   * Calculation: header height + padding-top = 77px
   *              53px          + 24px        = 77px
   *              53px          + 1.5rem      = 77px
   */
  STICKY_TOP_DETAIL = 77,

  /**
   * Used to scroll the last visited element into the view. This value has to be negative
   * to make the browser scroll down and slightly higher than STICKY_TOP_SEARCH to have it
   * scrolled naturally (not exactly) into the view.
   * Scrolling always happens in pixels, so no unit is needed.
   */
  SCROLL_Y_SEARCH = -77

}
