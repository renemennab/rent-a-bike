export const SESSION_DATA = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  ID: "_id",
  IS_MANAGER: "isManager",
  RESULT: "result",
  TOKEN: "token",
  PROFILE: "profile",
};

export function getLoggedInUser(): IlocalStorageProfile {
  const profileString = window.localStorage.getItem(SESSION_DATA.PROFILE);
  const profile = profileString ? JSON.parse(profileString) : null;
  return profile;
}
