import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './calendar';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Button } from './button';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Calendar />,
};

// Calendar with selected date
function SelectedDateCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border rounded-md"
      />
      <div className="text-center">
        {date ? (
          <p>Selected date: {format(date, 'PPP')}</p>
        ) : (
          <p>No date selected</p>
        )}
      </div>
    </div>
  );
}

export const WithSelectedDate: Story = {
  render: () => <SelectedDateCalendar />,
};

// Calendar with date range
function DateRangeCalendar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        className="border rounded-md"
        numberOfMonths={2}
      />
      <div className="text-center">
        {dateRange?.from ? (
          dateRange.to ? (
            <p>
              {format(dateRange.from, 'PPP')} – {format(dateRange.to, 'PPP')}
            </p>
          ) : (
            <p>{format(dateRange.from, 'PPP')}</p>
          )
        ) : (
          <p>No date range selected</p>
        )}
      </div>
    </div>
  );
}

export const DateRangeSelection: Story = {
  render: () => <DateRangeCalendar />,
};

// Calendar with disabled dates
function DisabledDatesCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const disabledDays = [
    new Date(2023, 10, 10), // Example: Nov 10, 2023
    new Date(2023, 10, 15), // Example: Nov 15, 2023
    { from: new Date(2023, 10, 20), to: new Date(2023, 10, 25) }, // Example: Nov 20-25, 2023
    { before: new Date() }, // Disable all dates before today
  ];
  
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={disabledDays}
      className="border rounded-md"
      defaultMonth={new Date(2023, 10)}
    />
  );
}

export const WithDisabledDates: Story = {
  render: () => <DisabledDatesCalendar />,
};

// Multiple months
export const MultipleMonths: Story = {
  render: () => (
    <Calendar
      numberOfMonths={2}
      className="border rounded-md"
    />
  ),
};

// Custom footer
function CalendarWithFooter() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const footer = (
    <div className="mt-4 pt-4 border-t flex items-center justify-between">
      <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
        Today
      </Button>
      <p className="text-sm text-muted-foreground">
        {date ? format(date, 'PPP') : 'Select a date'}
      </p>
    </div>
  );
  
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="border rounded-md p-3"
      footer={footer}
    />
  );
}

export const WithFooter: Story = {
  render: () => <CalendarWithFooter />,
}; 