import { TaskDTO } from "domain/TaskDTO";

export function orderTasks(tasks: TaskDTO[]) {
  return tasks.sort((t1, t2) => {
    const maxDate = new Date(8640000000000000).valueOf();

    const completedT1 = t1.completedDate?.valueOf() ?? 0;
    const completedT2 = t2.completedDate?.valueOf() ?? 0;

    const dueT1 = t1.dueDate?.valueOf() ?? maxDate;
    const dueT2 = t2.dueDate?.valueOf() ?? maxDate;

    const priorityT1 = t1.priority ?? 0;
    const priorityT2 = t2.priority ?? 0;

    const createdT1 = t1.createdDate?.valueOf() ?? maxDate;
    const createdT2 = t2.createdDate?.valueOf() ?? maxDate;

    if (completedT1 !== completedT2) {
      return completedT1 - completedT2;
    } else if (dueT1 !== dueT2) {
      return dueT1 - dueT2;
    } else if (priorityT1 !== priorityT2) {
      return priorityT2 - priorityT1;
    } else {
      return createdT1 - createdT2;
    }
  });
}
