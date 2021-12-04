export const loginUrl = "/auth/login";
export const searchDiscipleUrl = (page) => `/disciple/search?page=${page}`;
export const getUniqueDispleUrl = (id) => `/disciple/${id}/show`;
// Create
export const createHajriUrl = "/satnam_attendance/create";
export const createSatnamUrl = "/satnam/create";
export const createSatnamExamUrl = "/satnam_exam/create";
export const createSarnamUrl = "/sarnam/create";
export const createShuddhikaranUrl = "/shuddhikaran/create";
export const createPunarUpdeshUrl = "/reupdesh/create";
export const createSarshabdUrl = "/sarshabd/create";
export const consentOtpUrl = "/disciple/consent";
// Edit
export const editHajriUrl = (id) => `/satnam_attendance/${id}/edit`;
export const editSatnamUrl = (id) => `/satnam/${id}/edit`;
export const editSatnamExamUrl = (id) => `/satnam_exam/${id}/edit`;
export const editSarnamUrl = (id) => `/sarnam/${id}/edit`;
export const editShuddhikaranUrl = (id) => `/shuddhikaran/${id}/edit`;
export const editPunarUpdeshUrl = (id) => `/reupdesh/${id}/edit`;
export const editSarshabdUrl = (id) => `/sarshabd/${id}/edit`;

// Delete
export const deleteHajriUrl = (id) => `/satnam_attendance/${id}/delete`;
export const deleteSatnamUrl = (id) => `/satnam/${id}/delete`;
export const deleteSatnamExamUrl = (id) => `/satnam_exam/${id}/delete`;
export const deleteSarnamUrl = (id) => `/sarnam/${id}/delete`;
export const deleteShuddhikaranUrl = (id) => `/shuddhikaran/${id}/delete`;
export const deletePunarUpdeshUrl = (id) => `/reupdesh/${id}/delete`;
export const deleteSarshabdUrl = (id) => `/sarshabd/${id}/delete`;
