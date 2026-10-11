"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export function useFetch(path, { auth = true, interval } = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(!!path);

    const run = useCallback(
        async (silent = false) => {
            if (!path) return;
            if (!silent) setLoading(true);
            try {
                setData(await api(path, { auth }));
                setError(null);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        },
        [path, auth]
    );

    useEffect(() => {
        run();
        if (!interval) return;
        const id = setInterval(() => document.visibilityState === "visible" && run(true), interval);
        return () => clearInterval(id);
    }, [run, interval]);

    return { data, error, loading, reload: run, setData };
}
