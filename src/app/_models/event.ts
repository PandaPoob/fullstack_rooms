export interface FormattedCalenderEvent {
  id: string;
  url: string;
  start: Date;
  title: string;
  allDay: boolean;
  end?: Date | null;
}
