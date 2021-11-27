export default function checkIfDatesOverlap(selectedTimestamps, reservationStart, reservationEnd) {
    if (
        (selectedTimestamps.start < reservationEnd && selectedTimestamps.end > reservationEnd) ||
        (selectedTimestamps.end > reservationStart && selectedTimestamps.start < reservationStart)
    ) {
        return true
    }

    return false
}
