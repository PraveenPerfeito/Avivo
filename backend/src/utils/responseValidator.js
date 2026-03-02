const userRequiredFields = [
  "id",
  "firstName",
  "lastName",
  "maidenName",
  "age",
  "gender",
  "email",
  "phone",
  "username",
  "password",
  "birthDate",
  "image",
  "bloodGroup",
  "height",
  "weight",
  "eyeColor",
  "hair",
  "ip",
  "address",
  "macAddress",
  "university",
  "bank",
  "company",
  "ein",
  "ssn",
  "userAgent",
  "crypto",
  "role"
];

const hasKeys = (obj, keys) =>
  typeof obj === "object" && obj !== null && keys.every((key) => key in obj);

export const validateUsersResponse = (payload) => {
  if (!hasKeys(payload, ["users", "total"])) {
    return false;
  }

  if (!Array.isArray(payload.users)) {
    return false;
  }

  for (const user of payload.users) {
    if (!hasKeys(user, userRequiredFields)) {
      return false;
    }

    if (!hasKeys(user.hair, ["color", "type"])) {
      return false;
    }

    if (!hasKeys(user.address, ["address", "city", "state", "stateCode", "postalCode", "coordinates", "country"])) {
      return false;
    }

    if (!hasKeys(user.address.coordinates, ["lat", "lng"])) {
      return false;
    }

    if (!hasKeys(user.bank, ["cardExpire", "cardNumber", "cardType", "currency", "iban"])) {
      return false;
    }

    if (!hasKeys(user.company, ["department", "name", "title", "address"])) {
      return false;
    }

    if (!hasKeys(user.company.address, ["address", "city", "state", "stateCode", "postalCode", "coordinates", "country"])) {
      return false;
    }

    if (!hasKeys(user.company.address.coordinates, ["lat", "lng"])) {
      return false;
    }

    if (!hasKeys(user.crypto, ["coin", "wallet", "network"])) {
      return false;
    }
  }

  return true;
};
