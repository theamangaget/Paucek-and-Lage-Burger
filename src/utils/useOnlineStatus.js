import { useState, useEffect } from "react";

const useOnlineStatus = () => {
    const [OnlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        const handleOffline = () => setOnlineStatus(false);
        const handleOnline = () => setOnlineStatus(true);

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        // Cleanup
        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return OnlineStatus;
};

export default useOnlineStatus;