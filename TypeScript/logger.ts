import {config} from './config';
export abstract class Logger {

	public name :string;
	public configuration : config;

	constructor(name:string , configuration : config){
		this.name = name;
		this.configuration=configuration;
	}

	 abstract log(level:string,strings :Array<string> ) :void

	public getConfig()
	{
		return this.configuration;
	}
 }