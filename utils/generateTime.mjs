export const generateTime = () => {
    let time = String(new Date()).split(" ")[4].split(":");
    let hour = parseInt(time[0]);
    let minute = parseInt(time[1]);
    let second = parseInt(time[2]);

    if (hour == 12) {
        return String(hour + ":" + minute + second + "PM");
    }
    else if (hour > 12) {
        return String((hour - 12) + ":" + minute + ":" + second + "PM");
    } else if (hour == 0) {
        return String("12" + ":" + minute + ":" + second + "AM");
    } else {
        return String(hour + ":" + minute + ":" + second + "AM");
    }
}