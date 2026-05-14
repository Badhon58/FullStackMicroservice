"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AckeeTracker() {
    const pathname = usePathname();
    let DOMAIN_ID = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID!

    useEffect(() => {
        const loadTracker = async () => {
            const ackeeTracker = await import("ackee-tracker");

            const ackee = ackeeTracker.create(
                process.env.NEXT_PUBLIC_ACKEE_URL!,
                {
                    detailed: true,
                    ignoreLocalhost: true,
                    ignoreOwnVisits: false,
                }
            );

            ackee.record(DOMAIN_ID);
        };

        loadTracker();
    }, [pathname]);

    return null;
}