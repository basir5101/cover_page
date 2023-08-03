import React from 'react';

const YearSelect = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 10; year--) {
        years.push(year);
    }

    return (
        <select className="form-select">
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

export default YearSelect;
