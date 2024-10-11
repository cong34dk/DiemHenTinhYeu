// Giải mã token để lấy thông tin user (email, id, role, username) đây là phần payload từ jwt
export const decodeToken = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

// Hàm kiểm tra xem user có được xác thực hay không
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (!token) return false; // Nếu không có token, không xác thực

    // Giải mã token và kiểm tra hạn
    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;

    // Kiểm tra hạn của token (exp là thời gian hết hạn trong payload của JWT)
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
};
