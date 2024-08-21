export const formatDate = (date: Date) => {
    if (!date) return "";

    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("ru-RU", { month: "long" });
    const day = String(dateObj.getDate());
    return `${month[0].toUpperCase() + month.slice(1)} ${day}`;
};