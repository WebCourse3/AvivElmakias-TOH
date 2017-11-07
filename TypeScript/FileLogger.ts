import {Logger} from './logger';
import * as fs from 'fs';
import {config} from './config'
class Fileogger extends Logger{

	constructor(name:string , configuration : config){
		super(name, configuration);
	}

	log(level: string, strings: string[]): void {
		strings.forEach(string=>(fs.appendFile(__dirname+"/test.log",level +':'+ string + "\n", 'utf-8',(err) => {
				if (err) throw err;})
		));
	 }

}

let list : Array<string> = ["hello","my", "name",'is'];
//let logg = new Fileogger();
//logg.log("error", list);