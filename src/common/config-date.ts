export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-EN", {
      weekday: "short", // "Sun"
      day: "2-digit", // "12"
      month: "short", // "Des"
      year: "numeric", // "2025"
    });
  };

  export const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false // Gunakan format 24 jam
    });
};