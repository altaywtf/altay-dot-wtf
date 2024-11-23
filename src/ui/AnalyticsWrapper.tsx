"use client";

import { Analytics } from "@vercel/analytics/react";

const AnalyticsWrapper: React.FC = () => (
  <Analytics
    beforeSend={(event) => {
      if (localStorage.getItem("va-disable")) {
        return null;
      }

      return event;
    }}
  />
);

export default AnalyticsWrapper;
