const queries = {
    CHECK_USER_EXISTS: 'SELECT * FROM users WHERE email = $1',
    INSERT_PERSON: 'INSERT INTO persons (created_at) VALUES (NOW()) RETURNING id',
    INSERT_USER: 'INSERT INTO users (email, password, person_id, created_at) VALUES ($1, $2, $3, NOW())',
    GET_USER_BY_EMAIL: 'SELECT * FROM users WHERE email = $1'
  };
  
  module.exports = queries;