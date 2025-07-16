import { User } from '../../domain/entities/user.entity';

export function makeUserData(overrides: Partial<User> = {}): User {
  const defaultUser = new User(
    'John Doe',
    'test@gmail.com',
    '1234567890',
    'admin',
    '12345678901',
    'govbr-123456',
    '2023-10-01T00:00:00Z',
  );
}
