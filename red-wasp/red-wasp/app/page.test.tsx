import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('should have text-justify and inter-word classes', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('text-justify');
    expect(main).toHaveClass('inter-word');
  });
});
