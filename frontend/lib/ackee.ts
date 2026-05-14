import * as ackeeTracker from "ackee-tracker";

const ackeeServer = "http://3.110.45.176:3001";

export const ackee = ackeeTracker.create(ackeeServer, {
  detailed: true,
  ignoreLocalhost: true,
  ignoreOwnVisits: false,
});

export const DOMAIN_ID = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID!;
