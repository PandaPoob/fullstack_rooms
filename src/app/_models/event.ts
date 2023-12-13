export interface FormattedCalenderEvent {
  id: string;
  url: string;
  start: Date;
  title: string;
  allDay: boolean;
  end?: Date | null;
}

export interface EventCreateForm {
  title: string;
  description?: string;
  roomId: string;
  location?: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime?: string;
}
