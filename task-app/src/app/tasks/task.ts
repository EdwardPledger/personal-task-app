export interface Task {
    _id?: string,
    actualTime?: Number,
    name: string,
    description?: string,
    estimatedTime?: Number,
    taskState: Boolean
  }