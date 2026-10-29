import { TaskList } from "./task-list.js";
import { SegmentedControl } from "./segmented-control.js";
import { StatWidget } from "./stat-widget.js";
import { TaskForm } from "./task-form.js";
import { Task } from "./task.js";


// ==== CONSTANTS ====
//Enum pattern
const Status = Object.freeze({
    ALL: 0,
    ACTIVE: 1,
    COMPLETED: 2,
});


//  ==== VARIABLES ====

const segmentedControl = new SegmentedControl(
    document.getElementsByClassName('segmented-control')[0]
);

const taskStatWidget = new StatWidget(
    document.getElementsByClassName('stat-widget')[0]
);

const activeStatWidget = new StatWidget(
    document.getElementsByClassName('stat-widget')[1]
);

const doneStatWidget = new StatWidget(
    document.getElementsByClassName('stat-widget')[2]
);

const taskForm = new TaskForm(
    document.getElementsByClassName('task-form')[0]
);

const taskList = new TaskList(
    document.getElementsByClassName('task-list')[0]
);

// ==== STATES =====
let tasks = [
    new Task('Implementasi halaman register', true)
];

let selectedStatus = Status.ALL;


//  ==== MAIN ====
setupTaskForm();
setupSegmentedControl();
setupTaskList();

reloadStatWidgets();
reloadTasks();

// ==== SETUP ====

function setupTaskForm() {
    taskForm.onClickAddButton = function(inputtedText){
        if (inputtedText.length === 0) {
            return;
        }

        this.setValue('');
        tasks.push(new Task(inputtedText, false));
        
        reloadStatWidgets();
        reloadTasks();
    };
} 

function setupSegmentedControl() {
    segmentedControl.setSegments(['All', 'Active', 'Complete']);

    segmentedControl.onSelectSegment = function(index) {    
        this.setSelectedSegmentIndex(index);
        selectedStatus = index;
        reloadTasks();

    }
}

function setupTaskList() {
    taskList.onToggleTask = function (id) {
        const toggledTask = tasks.find(task => task.id === id);
        toggledTask.isCompleted = !toggledTask.isCompleted;

        reloadStatWidgets();
        reloadTasks();
    };

    taskList.onDeleteTask = function(id){
        tasks = tasks.filter(task => task.id !== id);
        
        reloadStatWidgets();
        reloadTasks();
    }

    taskList.onEditTask = function(id) {
        console.log(id);
        const editingTask = tasks.find(task => task.id === id);
        console.log(editingTask);
        editingTask.isEditing = true;

        reloadTasks();
    }

    ///


}

// ==== HELPERS ====

function reloadStatWidgets() {
    taskStatWidget.setCount(tasks.length);
    activeStatWidget.setCount(tasks.filter(task => !task.isCompleted).length);
    doneStatWidget.setCount(tasks.filter(task => task.isCompleted).length);
}

function reloadTasks() {
    let filteredTasks = tasks.slice();

    if (selectedStatus === Status.ACTIVE){
        filteredTasks = tasks.filter(task => !task.isCompleted);
    } else if (selectedStatus === Status.COMPLETED) {
        filteredTasks = tasks.filter(task => task.isCompleted);
    }

    taskList.setTasks(filteredTasks);
}
