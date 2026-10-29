export class TaskForm {
    element;
    onClickAddButton;

    _textInput;
    _addButton;

    constructor(element) {
        this.element = element;
        this._textInput = this.element.getElementsByClassName('task-input__field')[0];
        this._addButton = this.element.getElementsByClassName('btn')[0];
        
        this._updateAddButtonAppearance();
        this._addEventListeners();
    }

    setValue(value) {
        this._textInput.value = value;

    }

   _addEventListeners(){
        this._textInput.addEventListener('input', (event) =>{
            this._updateAddButtonAppearance();

        });

        this._addButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (typeof this.onClickAddButton === 'function'){
                this.onClickAddButton(this._textInput.value);
            }
        });
   } 

   _updateAddButtonAppearance() {
    const text = this._textInput.value;

    if (text.length === 0) {
        this._addButton.classList.add('btn--disabled');
    } else {
        this._addButton.classList.remove('btn--disabled');
    }

   }
}