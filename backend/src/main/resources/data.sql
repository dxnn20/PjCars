INSERT INTO cars (registration_number, brand, model, color, year, engine_capacity, fuel_type, power, torque, trunk_capacity, price)
VALUES ('ABC123', 'Toyota', 'Corolla', 'Black', 2020, 1, 'Petrol', 120, 150, 500, 25000.00);

INSERT INTO cars (registration_number, brand, model, color, year, engine_capacity, fuel_type, power, torque, trunk_capacity, price)
VALUES ('DEF456', 'Ford', 'Focus', 'White', 2019, 1.5, 'Diesel', 150, 200, 600, 30000.00);

INSERT INTO cars (registration_number, brand, model, color, year, engine_capacity, fuel_type, power, torque, trunk_capacity, price)
VALUES ('GHI789', 'Volkswagen', 'Golf', 'Red', 2018, 2, 'Petrol', 200, 250, 700, 35000.00);

INSERT INTO users (username, password, role, status)
VALUES ('admin', 'admin', 'ADMIN', 'APPROVED');

INSERT INTO users (username, password, role, status)
VALUES ('user', 'user', 'USER', 'BASE');

INSERT INTO users (username, password, role, status)
VALUES ('company', 'company', 'COMPANY', 'APPROVED');