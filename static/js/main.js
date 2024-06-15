document.addEventListener('DOMContentLoaded', () => {
    const todoApp = document.getElementById('todo-app');
    let todos = [];

    const renderTodos = () => {
        let html = `
            <form id="new-todo-form" class="add-items">
                <input type="text" id="new-todo" class="form-control" placeholder="New Todo">
                <button type="submit" class="btn">Add</button>
            </form>
            <ul>
        `;

        todos.forEach((todo, index) => {
            html += `
                <li class="${todo.completed ? 'completed' : ''}">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
                            <span class="input-helper"></span>
                            ${todo.text}
                        </label>
                    </div>
                    <span class="remove" data-index="${index}">&times;</span>
                </li>
            `;
        });

        html += `</ul>`;
        todoApp.innerHTML = html;

        todoApp.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', event => {
                const index = event.target.dataset.index;
                todos[index].completed = event.target.checked;
                renderTodos(); // Update UI after checkbox state changes
            });
        });

        todoApp.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', event => {
                const index = event.target.dataset.index;
                todos.splice(index, 1);
                renderTodos(); // Update UI after todo deletion
            });
        });
    };

    todoApp.addEventListener('submit', event => {
        event.preventDefault();
        const newTodoInput = document.getElementById('new-todo');
        const text = newTodoInput.value.trim();
        if (text !== '') {
            todos.push({ text: text, completed: false });
            newTodoInput.value = '';
            renderTodos();
        }
    });

    renderTodos(); // Initial render of todos
});
