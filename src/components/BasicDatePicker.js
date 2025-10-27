import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker({ date, onChange }) {
    const [value, setValue] = React.useState(dayjs(date));

    const handleChange = (newValue) => {
        setValue(newValue);
        if (typeof onChange === 'function') onChange(newValue); // pass dayjs object (or null) to parent
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker format='YYYY-MM-DD'
                    value={value}
                    onChange={handleChange}
                    label="Date (Year-Month-Day)"
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}