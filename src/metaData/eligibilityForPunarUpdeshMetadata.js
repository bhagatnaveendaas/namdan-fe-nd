import { centre } from "./commonMetadata";

export const eligibilityForPunarUpdeshMetadata = (data) => {
  const eligibleForPunarUpdeshCount = [
    {
      title: "Punar updesh eligible",
      dataKey: "punar_updesh_eligible",
      numeric: true
    }
  ];

  return [...centre(data), ...eligibleForPunarUpdeshCount]
};
