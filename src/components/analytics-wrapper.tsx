"use client";

import { Analytics } from "@vercel/analytics/react";

export const AnalyticsWrapper: React.FC = () => (
  <Analytics
    beforeSend={(event) => {
      if (localStorage.getItem("va-disable")) {
        return null;
      }

      return event;
    }}
  />
);
