import { TodoId, type Todo as TodoType } from "./types"


interface Props extends TodoType {
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodo: ({id} : TodoId) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
    return (

        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={(event) => {
                    onToggleCompleteTodo({id, completed: event.target.checked})
                 }}>
            </input>
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {
                    onRemoveTodo({id})
                }}>
            </button>
        </div>
    )
}