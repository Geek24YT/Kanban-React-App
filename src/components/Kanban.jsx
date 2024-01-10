import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

function Kanban() {
    const[completed,setCompleted] =useState([]);
    const[incomplete,setIncomplete] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((json) => {
            setCompleted(json.filter((task) => task.completed));
            setIncomplete(json.filter((task) => !task.completed));
          });
      }, []);

      const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        if (source.droppableId == destination.droppableId) return;
    
        //REMOVE FROM SOURCE ARRAY
    
        if (source.droppableId == 2) {
          setCompleted(removeItemById(draggableId, completed));
        } else {
          setIncomplete(removeItemById(draggableId, incomplete));
        }
    
        // GET ITEM
    
        const task = findItemById(draggableId, [...incomplete, ...completed]);
    
        //ADD ITEM
        if (destination.droppableId == 2) {
          setCompleted([{ ...task, completed: !task.completed }, ...completed]);
        } else {
          setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
        }
      };
    


      function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
      }
    

      function findItemById(id, array) {
         return array.find((item) => item.id == id);
       }

        function removeItemById(id, array) {
            return array.filter((item) => item.id != id);
        }
  return (
    <div>
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{textAlign:'center'}}>Kanban</h2>
            <div
            style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row"
            }}
            >
                <Column title={"TO DO"} task={incomplete} id={"1"}/>
                <Column title={"DONE"} task={completed} id={"2"}/>
                {/* <Column title={"BACKLOG"} task={[]} id={"3"}/> */}
            </div>
        </DragDropContext>
    </div>
  )
}

export default Kanban