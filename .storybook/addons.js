import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import 'storybook-addon-material-ui/register';

addons.setConfig({
	theme: themes.light,
});
