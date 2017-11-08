
import { configuration } from './config';
import * as fs from 'fs';

export class Logger {

	public name: string;
	public configuration: configuration;
	public filePath:string;
	public logOptions: any = {
		'info': this.info,
		'warning': this.warning,
		'debug': this.debug,
		'error': this.error

	};

	constructor(name: string, configuration?: configuration, filePath?:string ) {
		this.name = name;
		if(typeof configuration !== 'undefined') {
			this.configuration = configuration;
		}
		else if(typeof filePath!=='undefined'){
			this.configuration=this.getFromJson(filePath);
		}
	}



	log(level: string, ...strings: Array<string>): void {
		let printOpt = level || this.configuration.logLevel;
		this.logOptions[printOpt].apply(this, strings);

	}

	public info(strings: Array<string>) {
		if (this.configuration.console)
			this.infoConsole(strings);
		if (this.configuration.file)
			this.logFile(this.configuration.logLevel, strings);
	}

	public warning(strings: Array<string>) {
		if (this.configuration.console)
			this.warningConsole(strings);
		if (this.configuration.file)
			this.logFile(this.configuration.logLevel, strings);
	}

	public debug(strings: Array<string>) {
		if (this.configuration.console)
			this.debugConsole(strings);
		if (this.configuration.file)
			this.logFile(this.configuration.logLevel, strings);
	}

	public error(strings: Array<string>) {
		if (this.configuration.console)
			this.errorConsole(strings);
		if (this.configuration.file)
			this.logFile(this.configuration.logLevel, strings);
	}

	public infoConsole(strings: Array<string>) {
		if (this.configuration.colors)
			strings.forEach(string => (console.log('\x1b[32m%s\x1b[0m', string) ));
		else
			this.printReg(strings);
	}

	public warningConsole(strings: Array<string>) {
		if (this.configuration.colors)
			strings.forEach(string => (console.log('\x1b[33m%s\x1b[0m', string)));
		else
			this.printReg(strings);
	}

	public debugConsole(strings: Array<string>) {
		if (this.configuration.colors)
			strings.forEach(string => (console.log('\x1b[37m%s\x1b[0m', string)));
		else
			this.printReg(strings);
	}

	public errorConsole(strings: Array<string>) {
		if (this.configuration.colors)
			strings.forEach(string => (console.log('\x1b[31m%s\x1b[0m', string)));
		else
			this.printReg(strings);
	}

	public printReg(strings: Array<string>) {
		strings.forEach(string => (console.log(string)));
	}

	logFile(level: string, strings: Array<string>): void {
		fs.appendFileSync(__dirname + '/test.log', level + ' \n');
		strings.forEach(string => (fs.appendFileSync(__dirname + '/test.log', string + ' ')));
	}

	getFromJson(pathFile:string) : any {
		if(fs.existsSync(pathFile)){
			let config:string = fs.readFileSync(pathFile,'utf-8');
			return JSON.parse(config);
		}

	}
}
