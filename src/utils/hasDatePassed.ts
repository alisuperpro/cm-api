export function hasDatePassed(date: any) {
    // Get current date and time
    const currentDate = new Date()

    // Convert provided date to Date object
    let providedDate

    if (typeof date === 'string') {
        // Handle ISO format with single-digit hours (e.g., 2026-03-21T9:00:00)
        // Normalize by ensuring two digits for hours if needed
        const normalizedDate = date.replace(/T(\d{1,2}):/, (match, hour) => {
            return `T${hour.padStart(2, '0')}:`
        })
        providedDate = new Date(normalizedDate)
    } else if (date instanceof Date) {
        providedDate = new Date(date)
    } else {
        throw new Error('Invalid date format')
    }

    // Validate if date is valid
    if (isNaN(providedDate.getTime())) {
        throw new Error('Invalid date string')
    }

    // Compare dates including time
    return currentDate > providedDate
}
