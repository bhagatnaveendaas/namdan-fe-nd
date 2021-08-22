import { centre } from "./commonMetadata";

export const pendingSatnamMetadata = (data) => {
  const pendingSatnaamCountMetadat = [
    {
      title: "Pending Satnam",
      dataKey: "pending_satnam",
      numeric: true
    }
  ];

  return [...centre(data), ...pendingSatnaamCountMetadat]
};
