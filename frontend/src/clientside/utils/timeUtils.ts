export const formatTimeAgo = (time: Date): string => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000) // Tính bằng giây
    
    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
}