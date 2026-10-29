export class TaskList {
    element;

    onToggleTask;
    onDeleteTask;
    onEditTask;

    onConfirmEditTask;
    onCancelEditTask;

    _tasks = [];

    constructor(element){
        this.element = element;
        this._addEventListeners();
    }

    setTasks(tasks){
        this._tasks = tasks;
        this._render();
    }


    _render() {
       const taskItemElements = this._tasks.map(this._buildTaskItemElement);
        this.element.replaceChildren(...taskItemElements);
    }

    _addEventListeners() {
        this.element.addEventListener('click', (event) => {
            if (event.target === this.element){
                return;
            }

            if (
                event.target.classList.contains('checkbox') ||
                event.target.classList.contains('task-item__label')
            ) {
                // console.log('happens');
                const taskItemElement = event.target.parentElement;
                const id = taskItemElement.dataset.id;

                if (typeof this.onToggleTask === 'function') {
                    // console.log(id);
                    this.onToggleTask(id);
                }
            } else if (event.target.classList.contains('task-item__action--delete')){
                const taskItemElement = event.target.parentElement.parentElement.parentElement;
                const id = taskItemElement.dataset.id;

                if (typeof this.onDeleteTask === 'function') {
                    this.onDeleteTask(id);
                }
            } else if(event.target.classList.contains('task-item__action--edit')) {
                const taskItemElement = event.target.parentElement.parentElement.parentElement;
                const id = taskItemElement.dataset.id;

                console.log('edit button is clicked, id is:' + id);

                if (typeof this.onEditTask === 'function') {
                    this.onEditTask(id);
                }
            }
        });
    }

    _buildTaskItemElement(task) {
    
        const taskItemElement = document.createElement('li');
        taskItemElement.classList.add('task-item');
        taskItemElement.dataset.id = task.id;

        if(task.isEditing){
            taskItemElement.classList.add('task-item--editing');
        }

        if(task.isCompleted){
            taskItemElement.classList.add('task-item--completed');
        }

        const checkboxElement = document.createElement('span');
        checkboxElement.classList.add('checkbox');

        if (task.isCompleted) {
            checkboxElement.classList.add('checkbox--checked');
        }

        
        //CONTENT ELEMENT 
        const contentElement = document.createElement('div');
        contentElement.className= 'task-item__content';

        const labelElement = document.createElement('span');
        labelElement.classList.add('task-item__label');
        labelElement.textContent = task.name;

        const contentActionsElement = document.createElement('div');
        contentActionsElement.className = 'task-item__actions';

        const editButtonElement = document.createElement('button');
        editButtonElement.className= 'task-item__action task-item__action--edit';

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.className ='task-item__action task-item__action--delete';

        // FORM ELEMENT
        const formElement = document.createElement('div');
        formElement.className = 'task-item__form';
        
        const inputElement = document.createElement('input');
        inputElement.className = 'task-item__form-input';
        inputElement.value = task.name;


        const formActionElement = document.createElement('div');
        formActionElement.className = 'task-item__form-actions';
        
        const confirmButtonElement = document.createElement('button');
        confirmButtonElement.className= 'task-item__form-action task-item__form-action--confirm';

        const cancelButtonElement = document.createElement('button');
        cancelButtonElement.className ='task-item__form-action task-item__form-action--cancel';

        formActionElement.appendChild(confirmButtonElement);
        formActionElement.appendChild(cancelButtonElement);
        
        contentActionsElement.appendChild(editButtonElement);
        contentActionsElement.appendChild(deleteButtonElement);
        
        formElement.appendChild(inputElement);
        formElement.appendChild(formActionElement);

        contentElement.appendChild(labelElement);
        contentElement.appendChild(contentActionsElement);

        taskItemElement.appendChild(checkboxElement);
        taskItemElement.appendChild(formElement);
        taskItemElement.appendChild(contentElement);

        return taskItemElement;
        
    }

}