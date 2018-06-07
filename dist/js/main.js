'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The master todo list controller
 * Keeps all the items in an array, and updates the DOM as needed
 * 
 */
var TodoList = function () {
	function TodoList() {
		_classCallCheck(this, TodoList);

		this.items = [];
		this.$newItemInput = document.querySelector('[name=new-item]');
		this.$itemsTotal = document.querySelector('.total');
		this.$itemsDone = document.querySelector('.done');
		this.$todoUL = document.querySelector('.todo ul');

		this.$newItemInput.addEventListener('keyup', this.inputChange.bind(this));

		// listen for the "something changed" event, call updateView
		window.addEventListener("itemchanged", this.updateView.bind(this));
	}

	_createClass(TodoList, [{
		key: 'inputChange',
		value: function inputChange(e) {

			if (e.keyCode === 13) {
				this.items.push(new TodoItem(this.$newItemInput.value));

				this.$newItemInput.value = "";
				this.updateView();
			}
		}
	}, {
		key: 'updateView',
		value: function updateView() {
			var _this = this;

			// var doneCount = 0;
			this.items.forEach(function (item) {
				_this.$todoUL.appendChild(item.$itemLi);
				// if (item.done === true) {
				// 	doneCount ++;
				// 	this.$itemsDone.innerHTML += item;
				// }
			});
			this.$itemsTotal.innerHTML = this.items.length;

			// this.$itemsDone.innerHTML = doneCount;

			var doneItems = this.items.filter(function (item) {
				return item.done;
			});
			console.log(doneItems);
			this.$itemsDone.innerHTML = doneItems.length;
		}
	}]);

	return TodoList;
}();

/**
 * One todo list item
 * Keeps track of it's own state (text, done, etc)
 * Updates it's own internal DOM as needed
 */


var TodoItem = function () {
	function TodoItem(text) {
		_classCallCheck(this, TodoItem);

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

	_createClass(TodoItem, [{
		key: 'checkOff',
		value: function checkOff() {
			this.done = !this.done;
			this.updateView();

			// tell the world
			window.dispatchEvent(new Event('itemchanged'));
		}
	}, {
		key: 'updateView',
		value: function updateView() {
			this.done ? this.$itemLi.classList.add('done') : this.$itemLi.classList.remove('done');
		}
	}]);

	return TodoItem;
}();

;

var todoList = new TodoList();
//# sourceMappingURL=main.js.map
