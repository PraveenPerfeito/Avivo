import { pool } from "../config/database.js";

const usersQuery = `
  SELECT
    u.id,
    u.first_name,
    u.last_name,
    u.maiden_name,
    u.age,
    u.gender,
    u.email,
    u.phone,
    u.username,
    u.password,
    u.birth_date,
    u.image,
    u.blood_group,
    u.height,
    u.weight,
    u.eye_color,
    u.ip,
    u.mac_address,
    u.university,
    u.ein,
    u.ssn,
    u.user_agent,
    u.role,
    h.color AS hair_color,
    h.type AS hair_type,
    a.address_line AS user_address_line,
    a.city AS user_city,
    a.state AS user_state,
    a.state_code AS user_state_code,
    a.postal_code AS user_postal_code,
    a.lat AS user_lat,
    a.lng AS user_lng,
    a.country AS user_country,
    b.card_expire,
    b.card_number,
    b.card_type,
    b.currency,
    b.iban,
    c.department,
    c.name AS company_name,
    c.title AS company_title,
    ca.address_line AS company_address_line,
    ca.city AS company_city,
    ca.state AS company_state,
    ca.state_code AS company_state_code,
    ca.postal_code AS company_postal_code,
    ca.lat AS company_lat,
    ca.lng AS company_lng,
    ca.country AS company_country,
    cr.coin,
    cr.wallet,
    cr.network
  FROM users u
  INNER JOIN hair_profiles h ON h.user_id = u.id
  INNER JOIN addresses a ON a.id = u.address_id
  INNER JOIN banks b ON b.user_id = u.id
  INNER JOIN companies c ON c.user_id = u.id
  INNER JOIN addresses ca ON ca.id = c.address_id
  INNER JOIN crypto_wallets cr ON cr.user_id = u.id
  ORDER BY u.id ASC
`;

const formatBirthDate = (value) => {
  const birthDate = value instanceof Date ? value : new Date(value);
  return `${birthDate.getUTCFullYear()}-${birthDate.getUTCMonth() + 1}-${birthDate.getUTCDate()}`;
};

const mapRowToUser = (row) => ({
  id: row.id,
  firstName: row.first_name,
  lastName: row.last_name,
  maidenName: row.maiden_name,
  age: row.age,
  gender: row.gender,
  email: row.email,
  phone: row.phone,
  username: row.username,
  password: row.password,
  birthDate: formatBirthDate(row.birth_date),
  image: row.image,
  bloodGroup: row.blood_group,
  height: Number(row.height),
  weight: Number(row.weight),
  eyeColor: row.eye_color,
  hair: {
    color: row.hair_color,
    type: row.hair_type
  },
  ip: row.ip,
  address: {
    address: row.user_address_line,
    city: row.user_city,
    state: row.user_state,
    stateCode: row.user_state_code,
    postalCode: row.user_postal_code,
    coordinates: {
      lat: Number(row.user_lat),
      lng: Number(row.user_lng)
    },
    country: row.user_country
  },
  macAddress: row.mac_address,
  university: row.university,
  bank: {
    cardExpire: row.card_expire,
    cardNumber: row.card_number,
    cardType: row.card_type,
    currency: row.currency,
    iban: row.iban
  },
  company: {
    department: row.department,
    name: row.company_name,
    title: row.company_title,
    address: {
      address: row.company_address_line,
      city: row.company_city,
      state: row.company_state,
      stateCode: row.company_state_code,
      postalCode: row.company_postal_code,
      coordinates: {
        lat: Number(row.company_lat),
        lng: Number(row.company_lng)
      },
      country: row.company_country
    }
  },
  ein: row.ein,
  ssn: row.ssn,
  userAgent: row.user_agent,
  crypto: {
    coin: row.coin,
    wallet: row.wallet,
    network: row.network
  },
  role: row.role
});

export const findAllUsers = async () => {
  const [rows] = await pool.execute(usersQuery);
  return rows.map(mapRowToUser);
};
