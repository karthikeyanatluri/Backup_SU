import { archiveEvents } from "../../../../utils/supragna2k27Data";
export const useFetchEvents = (category: string) =>
  archiveEvents.filter((event) => event.category === category.toLowerCase());
