import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '../src/components/ui';

test('button exposes name/role and fires onPress', () => {
  const fn = jest.fn();
  render(<Button label="Apri" onPress={fn} />);
  fireEvent.press(screen.getByRole('button', { name: 'Apri' }));
  expect(fn).toHaveBeenCalled();
});
test('disabled button does not fire', () => {
  const fn = jest.fn();
  render(<Button label="Apri" onPress={fn} disabled />);
  fireEvent.press(screen.getByRole('button', { name: 'Apri' }));
  expect(fn).not.toHaveBeenCalled();
});
