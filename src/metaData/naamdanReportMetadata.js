import { centre } from "./commonMetadata";

export const naamdanReportMetaData = (data) => {
  const naamdanReportCountMetadata =
    [
      {
        title: "Pratham",
        dataKey: "prathams",
        numeric: true
      },
      {
        title: "Satnaam",
        dataKey: "satnams",
        numeric: true
      },
      {
        title: "Sarnams",
        dataKey: "sarnams",
        numeric: true
      }
    ];

  return [...centre(data), ...naamdanReportCountMetadata]
};