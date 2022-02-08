import { createWriteStream, write } from 'fs'
import { pipeline, Readable, Transform, Writable } from 'stream'

// const writable = new Writable({
// 		write(chunk, encondig, cb){
// 			console.log('NOSSO CHUNK -> ', chunk.toString())

// 			cb()
// 		}
// })

const readable = new Readable({
	read(){
		for (let max = 0; max < 10; max++) {
			const aula = { nome: `CAMPUS CODE - ${max}`}
			this.push(JSON.stringify(aula))
		}

		this.push(null)
	}
})

const addBreakline = new Transform({
	objectMode: true,
	transform(chunk, encondig, cb){
		console.log('primeiro transform', chunk)
		cb(null, `${chunk}\n`)
	}
})

const addHeader = new Transform({
	transform(chunk, encondig, cb){
		this.counter = this.counter ?? 0;
		if(this.counter == 0) {
			this.counter++

			cb(null, "NOME\n".concat(chunk))
			return;
		}

		cb(null, chunk)
	}
})

readable
.pipe(addBreakline)
.pipe(addHeader)
// .pipe(createWriteStream('./tmp.txt'))

