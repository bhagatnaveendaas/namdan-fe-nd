import { roles } from "../constants/text/Roles";

export const roleToAddSewadaarMapping = (role) => {
  switch (role) {
    case roles.ASHRAM_ADMIN.name: {
      return [roles.COUNTRY_COORDINATOR, roles.STATE_COORDINATOR, roles.DISTRICT_COORDINATOR, roles.NAAMDAN_SEWADAR]
    }
    case roles.COUNTRY_COORDINATOR.name: {
      return [roles.STATE_COORDINATOR, roles.DISTRICT_COORDINATOR, roles.NAAMDAN_SEWADAR]
    }
    case roles.STATE_COORDINATOR.name: {
      return [roles.NAAMDAN_SEWADAR, roles.DISTRICT_COORDINATOR]
    }
    case roles.DISTRICT_COORDINATOR.name: {
      return [roles.NAAMDAN_SEWADAR]
    }
  }
};
