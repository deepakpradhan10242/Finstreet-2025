export const generateInviteCode = (teamName) => {
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${teamName.split(" ")[0].toUpperCase().slice(0, 4)}${suffix}`;
};
