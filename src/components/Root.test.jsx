import React from 'react';
import { render } from '@testing-library/react';
import Root from './Root.component';

test('renders learn react link', () => {
	const { getByText } = render(<Root />);
	const el = getByText(/hello world/i);
	expect(el).toBeInTheDocument();
});
