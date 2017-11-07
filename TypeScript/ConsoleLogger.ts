import { Logger } from './logger';
import { config } from './config';

class ConsoleLogger extends Logger {

	constructor(name: string, configuration: config) {
		super(name, configuration);
	}

	public colorLog: any = {
		'info': this.info,
		'warning': this.warning,
		'debug': this.debug,
		'error': this.error

	};

	// if console is true check for colors, if true print with color else print regular.
	public log(level: string, strings: Array<string>): void {
		if (!super.getConfig().console) {
			if (super.getConfig().colors)
				this.colorLog[super.getConfig().logLevel](strings);
			else {
				console.log(super.getConfig().logLevel + ': \n');
				strings.forEach(string => (console.log(string)));
			}
		}

	}

	public info(strings: Array<string>) {
		strings.forEach(string => (console.log('\x1b[32m%s\x1b[0m', string) ));
	}

	public warning(strings: Array<string>) {
		strings.forEach(string => (console.log('\x1b[33m%s\x1b[0m', string)));
	}

	public debug(strings: Array<string>) {
		strings.forEach(string => (console.log('\x1b[37m%s\x1b[0m', string)));
	}

	public error(strings: Array<string>) {
		strings.forEach(string => (console.log('\x1b[31m%s\x1b[0m', string)));
	}

	public printReg(strings: Array<string>) {
		strings.forEach(string => (console.log(string)));
	}

	public isColorsTrue(){
		return super.getConfig().colors;
	}

}

let list: Array<string> = ['hello', 'my', 'name', 'is'];
let logg = new ConsoleLogger('warning', {
	console: true,
	file: false,
	colors: true,
	logLevel: 'warning'
});
logg.warning(list);
