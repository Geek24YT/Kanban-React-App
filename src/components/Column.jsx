import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import Task from './Task';

const Container = styled.div`
background-color:#f4f5f7;
border-radius:2.5px;
width:300px;
height:475px;
overflow-y:scroll;
-ms-overflow-style:none;
scrollbar-widht:none;
border:1px solid gray;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
padding:8px;
background-color:pink;
text-align:center;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
position: sticky;
top: 0; /* Adjust the top value as needed */
z-index: 1; /* Ensure the title appears above other content */
`;

const TaskList = styled.div`
padding:3px;
transition:background-color 0.2s ease;
background-color:#f4f5f7;
flex-grow:1;
min-height:100px;
`
function Column({title, task, id}) {
  return (
    <Container>
        <Title style={{
            background:'lightblue',
        }}>
            {title}
        </Title>

        <Droppable droppableId={id}>
            {(provided,snapshot)=>(
                <TaskList 
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                >
                    {/* Provide your task */}
                    {
                        task.map((task,index)=>(
                            <Task task={task} index={index} key={index}/>
                        ))
                    }
                    {provided.placeholder}
                </TaskList>
            )}
        </Droppable>
    </Container>
  )
}

export default Column