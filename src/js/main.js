/**
 * The master todo list controller
 * Keeps all the items in an array, and updates the DOM as needed
 * 
 */
class TodoList {
	constructor() {

		this.items = [];
		this.$newItemInput = document.querySelector('[name=new-item]');
		this.$itemsTotal = document.querySelector('.total');
		this.$itemsDone = document.querySelector('.done');
		this.$todoUL = document.querySelector(`.todo ul`)

		this.$newItemInput.addEventListener('keyup', this.inputChange.bind(this));
	
		// listen for the "something changed" event, call updateView
		window.addEventListener("itemchanged", this.updateView.bind(this));
	}

	inputChange(e) {

		if (e.keyCode === 13) {
			this.items.push(new TodoItem(this.$newItemInput.value));
			
			this.$newItemInput.value = "";
			this.updateView()
		}
	}

	updateView () {
		// var doneCount = 0;
		this.items.forEach((item) => {
			this.$todoUL.appendChild(item.$itemLi);
			// if (item.done === true) {
			// 	doneCount ++;
			// 	this.$itemsDone.innerHTML += item;
			// }
		})
		this.$itemsTotal.innerHTML = this.items.length;

		// this.$itemsDone.innerHTML = doneCount;

		let doneItems = this.items.filter((item) => {return item.done})
		console.log(doneItems)
		this.$itemsDone.innerHTML = doneItems.length;
	}
}




/**
 * One todo list item
 * Keeps track of it's own state (text, done, etc)
 * Updates it's own internal DOM as needed
 */
class TodoItem {
	constructor(text) {

		this.text = text;
		this.done = false;

		this.$itemLi = document.createElement('li');
		this.$itemP = document.createElement('p');
		this.$itemP.innerHTML = this.text;
		this.$itemLi.appendChild(this.$itemP);

		this.$itemButton = document.createElement('button');
		this.$itemLi.appendChild(this.$itemButton);

		// $todoUL.appendChild( ... )
		// $todoUL.appendChild(this.$itemLi);
		this.$itemButton.addEventListener('click', this.checkOff.bind(this));
	}

	checkOff ()  {
		this.done = !this.done;
		this.updateView();

		// tell the world
		window.dispatchEvent(new Event('itemchanged'));


	};

	updateView ()  {
		this.done ? this.$itemLi.classList.add('done') : this.$itemLi.classList.remove('done');
	};
 			


};


let todoList = new TodoList();

