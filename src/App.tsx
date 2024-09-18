import { useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, TodoId, Todo as TodoType, TodoTitle } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/header"
import { ListOfTodos } from "./types"

const storage = JSON.parse(localStorage.getItem('TODOS') || '{}');
console.log(storage)
const localStorageTodos: ListOfTodos = storage

function App() {
  const [todos, setTodos] = useState(localStorageTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    localStorage.setItem("TODOS", JSON.stringify(newTodos))

    setTodos(newTodos)
  }

  const handleRemoveAllCompleted = (): void =>{
    const newTodos = todos.filter (todo => !todo.completed)
    localStorage.setItem("TODOS", JSON.stringify(newTodos))

    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id == id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos,newTodo]
    localStorage.setItem("TODOS", JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />

      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>

  )

}

export default App
