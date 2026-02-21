/**
 * Checks if a user is 18 years old or older.
 * * @param {string} birthDateValue - The birth date string (usually from a date input).
 * @returns {boolean} - Returns true if the user is 18+, otherwise returns false.
 */
export const calculateAge = (birthDateValue) => {
  if (!birthDateValue) return true; // Leave empty check to 'required' validation

  const today = new Date();
  const birthDate = new Date(birthDateValue);

  // Initial age calculation based on years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birth month/day hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};
