export const getUserInitials = (fullname: string) => {
  const initials = fullname
    .replace(",", "")
    .split(" ")
    .map((char) => char[0])
    .join("");

  return initials;
};
