let recognition
try {
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	recognition = new SpeechRecognition
}
catch(e) {
	console.log(e)
}

const save = () => {
	const html = app.innerHTML
	fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			html: html.replace(/contenteditable="true"/gi, '<%- content %>')
		})
	})
}

setInterval(() => {
	save()
}, 4000)

window.onbeforeunload = () => {
	save()
	return 'Are you sure you want to leave?'
}

const options = document.getElementsByClassName('option')
const app = document.getElementById('app')

const createElement = (className, contenteditable) => {
	const div = document.createElement('div')
	div.className = className
	if(contenteditable) {
		div.setAttribute('contenteditable', true)
	}
	div.setAttribute('spellcheck', false)
	return div
}

const createPage = () => {
	const page = createElement('page')
	const toAppend = [
		createElement('questions', true),
		createElement('notes', true),
		createElement('summary', true)
	].forEach(elem => {
		page.appendChild(elem)
	})

	app.appendChild(page)
}

options[0].addEventListener('click', createPage)

let running = false
options[1].addEventListener('click', () => {
	if(!running) {
		recognition.start()
		let content = ''
		recognition.error = e => {
			console.log(e)
		}
		recognition.onresult = event => {
			let current = event.resultIndex

			let transcript = event.results[current][0].transcript

			const active = document.activeElement
			content += transcript
			
			active.textContent = content
		}
		recognition.onend = () => {
			if(running) {
				recognition.start()
			}
		}
		running = true
	}
	else {
		recognition.stop()
		running = false
	}
})

options[2].addEventListener('click', () => save)