"use client";

import isValidUrl from "@/lib/isValidUrl";
import { useState } from "react";

interface CodeUrl {
    id: string;
    longUrl: string;
    codeUrl: string;
    createdAt: string;
    expiresAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";

export function useShorten() {
    const [longUrl, setLongUrl] = useState('');
    const [codeUrls, setCodeUrls] = useState<CodeUrl[]>([]);
    const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!longUrl) {
            setMessage({ type: "error", text: "Please enter a valid URL." });
            return;
        }

        if (!isValidUrl(longUrl)) {
            setMessage({ type: "error", text: "The URL you entered is not valid." });
            return;
        }

        setIsLoading(true);
        setMessage({ type: null, text: "" });

        try {
            const res = await fetch("/api/short", {
                method: "POST",
                body: JSON.stringify({ longUrl }),
            });

            if (res.ok) {
                const data = await res.json();
                setCodeUrls(prevUrls => [data, ...prevUrls]);
                setMessage({ type: "success", text: "URL shortened successfully!" });

                setTimeout(() => {
                    setMessage({ type: null, text: "" });
                }, 2 * 1000); // Clear message after 2 seconds

                setLongUrl("");
            } else {
                const errorData = await res.json();
                setMessage({ type: "error", text: errorData.error || "Failed to create short URL" });
            }

        } catch (err) {
            setMessage({ type: "error", text: "Network error occurred. Please try again." });
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const copyToClipboard = () => {
        if (!codeUrls.length) return;

        navigator.clipboard
            .writeText(BASE_URL + codeUrls[0].codeUrl)
            .then(() => setIsCopied(true))
            .then(() => setTimeout(() => setIsCopied(false), 3 * 1000)) // Reset after 3 seconds
            .catch(() => setMessage({ type: "error", text: "Failed to copy to clipboard" }));
    };

    return {
        longUrl,
        setLongUrl,
        setMessage,
        codeUrls,
        message,
        isLoading,
        isCopied,
        handleSubmit,
        copyToClipboard,
    };
}