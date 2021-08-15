const countryMetaData = {
  title: "Country",
  dataKey: "country_name"
};

const stateMetaData = {
  title: "State",
  dataKey: "state_name"
};

const districtMetaData = {
  title: "District",
  dataKey: "district_name"
};

const tehsilMetaData = {
  title: "Tehsil",
  dataKey: "tehsil_name"
};

export const naamdanCentreMetadata = (data) => {
  let centre = [];

  if (data[countryMetaData.dataKey])
    centre = [countryMetaData];
  else if (data[stateMetaData.dataKey])
    centre = [stateMetaData];
  else if (data[districtMetaData.dataKey])
    centre = [districtMetaData];
  else
    centre = [tehsilMetaData];

  const naamCountMetadata = [
    {
      title: "Prathams",
      dataKey: "prathams",
      numeric: true
    },
    {
      title: "Sarnams",
      dataKey: "sarnams",
      numeric: true
    },
    {
      title: "Satnams",
      dataKey: "satnams",
      numeric: true
    }
  ];

  return [...centre, ...naamCountMetadata];
};