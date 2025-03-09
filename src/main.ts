import { Game } from './scripts/Game.js';
import { Console } from './scripts/Console.js';

Console.log(
	"🔒 Trying to bypass the authentication by hacking your way around in the code? No no no, we don't allow that at this time!",
);

try {
	Game.getInstance();
} catch (error) {
	const exceptionAlertLines = [
		'------------------------------------',
		'BSOD (Bird Screen Of Death)',
		'------------------------------------',
		'Quacksident occured.',
		'',
		`${error.name}: ${error.message}`,
		'',
		"It's not a duckup, it's a feather.",
		'Open the element inspector to deduck this feature.',
	];
	alert(exceptionAlertLines.join('\n'));
	throw error;
}
