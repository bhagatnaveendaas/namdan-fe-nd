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

export const centre = (data) => {
  if (data[countryMetaData.dataKey])
    return [countryMetaData];
  else if (data[stateMetaData.dataKey])
    return [stateMetaData];
  else if (data[districtMetaData.dataKey])
    return [districtMetaData];
  else
    return [tehsilMetaData];
}