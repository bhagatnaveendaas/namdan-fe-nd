import { centre } from "./commonMetadata";

export const naamdanCentreMetadata = (data) => {
  const naamCountMetadata = [
    {
      title: "Prathams",
      dataKey: "prathams",
      numeric: true
    },
    {
      title: "Satnams",
      dataKey: "satnams",
      numeric: true
    },
    {
      title: "Shuddhikaran",
      dataKey: "shuddhikaran",
      numeric: true
    }
  ];

  return [...centre(data), ...naamCountMetadata];
};