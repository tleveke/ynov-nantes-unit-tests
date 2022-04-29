const ToDo = require('../../toDoModel').ToDo;

describe('ToDo Model', () => {
    it('should create', () => {
        const todo = new ToDo({
            text: 'Test todo'
        });
        expect(todo.text).toBe('Test todo');
        expect(todo.done).toBe(false);
    });
    it('should update name', async () => {
        const todo = new ToDo({
            text: 'Test todo'
        });
        todo.text = 'Test todo updated';
        
        expect(todo.text).toBe('Test todo updated');
    });
    it('should update done', async () => {
        const todo = new ToDo({
            text: 'Test todo'
        });
        todo.done = true;
        
        expect(todo.done).toBe(true);
    });
});