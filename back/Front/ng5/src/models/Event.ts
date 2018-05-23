/**
 * Event entity, used for filtering as well.
 */
export class Event {
  /**
   * @type {number} id Unique numeric identifier for event.
   */
  id: number;
  /**
   * @type {string} name The name of the event.
   */
  name: String;

  /**
   * @type {number} price The price of the event.
   */
  price: number;

  /**
   * @type {object} location The location of the event storing coordinates and type
   *               for MongoDB.
   */
  location: Object;

   /**
   * @type {string} venueName The name of the  venue having an event.
   */
  venueName: String;

   /**
   * @type {string} date The date of the event.
   */
  date: string;

   /**
   * @type {string} image The URL containing path to an image for the event.
   */
  image: String;
}
