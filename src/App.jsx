import { useEffect, useState } from "react"
import { ToastContainer, toast, Bounce } from 'react-toastify';

function App ()
{
  const [ title, setTitle ] = useState( "" )
  const [ editId, setEditId ] = useState( null )
  const [ filter, setFilter ] = useState( 'all' );
  const [ todos, setTodos ] = useState( localStorage.getItem( "todos" ) ?
    JSON.parse( localStorage.getItem( "todos" ) ) : []
  )

  useEffect( () =>
  {
    localStorage.setItem( "todos", JSON.stringify( todos ) )
  }, [ todos ] )

  const handelReset = () =>
  {
    setTitle( "" )
  }


  // add todo
  const handleTodo = ( e ) =>
  {
    e.preventDefault()

    if ( !title.trim() ) return

    if ( editId )
    {
      setTodos( todos.map( ( item ) => item.id === editId ? { ...item, title: title } : item ) )
      toast.warn( "Todo edit qilindi" )
      setTitle( "" )
      setEditId( null )
    } else
    {
      let todo = {
        id: Date.now(),
        title: title,
        isCompleted: false
      }
      setTodos( ( t ) => [ todo, ...t ] )
      setTitle( "" )
      toast.info( "Todo qo'shildi" )
    }

  }


  const handleDelete = ( id ) =>
  {
    setTodos( todos.filter( ( item ) => item.id !== id ) )
    toast.error( "Todo o'chirildi" )
  }

  // checkbox
  const toggleComplete = ( id ) =>
  {
    setTodos( todos.map( ( item ) => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item ) )
  }

  // edit

  const handeEdit = ( item ) =>
  {
    setEditId( item.id )
    setTitle( item.title )
  }

  // clear

  const clearAllCompleted = () =>
  {
    setTodos( todos.filter( element => !element.isCompleted ) )
  }

  //filter
  const completedCount = todos.filter( item => item.isCompleted ).length;
  const filteredTodos = todos.filter( item =>
  {
    if ( filter === 'active' ) return !item.isCompleted;
    if ( filter === 'completed' ) return item.isCompleted;
    return true;
  } )

  return (
    <div className="max-w-7xl mx-auto p-3">
      <h1 className="mt-5 text-5xl" >Todo list</h1>
      <ToastContainer
        position="top-right"
        autoClose={ 4000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick={ true }
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={ Bounce }
      />
      <div className="todo-add">
        <form className="mt-3" onSubmit={ handleTodo }>
          <input type="text" placeholder="todo..." className="bg-white p-3 border-gray-500/50 border-1 rounded-xl w-4xl"
            value={ title }
            onChange={ ( e ) => setTitle( e.target.value ) }
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-xl ms-3" >{ editId ? "Edit todo" : "Add todo" }</button>

          <button type="reset" onClick={ handelReset } className="bg-amber-900 text-white p-3 rounded-xl ms-3" >Reset</button>
        </form>
      </div>

      <div className="mt-5">
        {
          filteredTodos.length > 0 ? filteredTodos.map( ( item ) => (
            <div key={ item.id } className={ item.isCompleted ? "line-through text-red-500 bg-gray-100 p-3 rounded-xl mb-3 flex justify-between align-middle" : " bg-white p-3 rounded-xl mb-3 flex justify-between align-middle" }>
              <div className="flex align-middle">
                <input onClick={ () => toggleComplete( item.id ) } type="checkbox" defaultChecked={ item.isCompleted } />
                <h4 className="ms-3">{ item.title }</h4>
              </div>
              <div className="flex align-middle">
                <button onClick={ () => handeEdit( item ) }>✏️</button>
                <button onClick={ () => handleDelete( item.id ) } className="ms-3">🗑️</button>
              </div>
            </div>
          ) ) : <h1>No Todo faund </h1>
        }
      </div>
      <div className="status mt-5 flex gap-2">
        <button
          onClick={ () => clearAllCompleted() }
          className="bg-red-500 text-white p-2 rounded-xl"
        >
          Delete all completed
        </button>

        <button
          onClick={ () => setFilter( 'completed' ) }
          className={ `p-2 rounded-xl text-white bg-blue-500 transition-all ${ filter === 'completed' ? 'ring-4 ring-blue-300 font-bold' : 'opacity-50'
            }` }
        >
          Completed: { completedCount }
        </button>

        <button
          onClick={ () => setFilter( 'active' ) }
          className={ `p-2 rounded-xl text-white bg-green-500 transition-all ${ filter === 'active' ? 'ring-4 ring-green-300 font-bold' : 'opacity-50'
            }` }
        >
          Active
        </button>
      </div>

    </div>
  )
}

export default App




