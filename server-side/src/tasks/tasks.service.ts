import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksByFilterDto } from './dto/getTasksByFilter.dto';

@Injectable()
export class TasksService {
    private tasks: Task [] = [];

    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTasksByFilter(filterDto : GetTasksByFilterDto) : Task[] {
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if(search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search))
        }
        return tasks;
    }

    getTaskById(id: string) : Task {
        return this.tasks.find(task => task.id === id)
    }

    createTask(title: string, description: string){
        const task : Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        let taskIndex = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(taskIndex, 1);
    }

    changeStatus(id: string, status: TaskStatus) : Task {
        let task = this.getTaskById(id)
        task.status = status;
        return task;
    }
}
