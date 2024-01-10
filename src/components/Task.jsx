import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';

const Container = styled.div`
border-radius:10px;
padding:8px;
color:#000;
margin-top:8px;
min-height:90px;
margin-left:10px;
margin-right:10px;
background-color: ${(props)=>bgcolorChange(props)};
cursor:pointer;
display:flex;
justify-content:space-between;
flex-direction:column;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`

const TextContent = styled.div`
`;

const Icon = styled.div`
display:flex;
justify-content:end;
padding:2px;
`;

function bgcolorChange(props){
  return props.isDragging? "lightgray":
  props.isDraggable? props.isBacklog? '#F2D7D5' : '#DCDCDC' : props.isBacklog? "#F2D7D5" : '#fffada'
}
export default function Task({task,index}) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
    {(provided,snapshot)=>(
      <Container
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      >
       <div style={{display:"flex", justifyContent:"start", padding:2}}>
        <span>
          <small>#{task.id}</small>
        </span>
       </div>
       <div style={{display:"flex", justifyContent:"center", padding:1}}>
          <TextContent>{task.title}</TextContent>
       </div>
      <Icon>
        <div>
          @_@
        </div>
      </Icon>
      {provided.placeholder}
      </Container>
    )}

    </Draggable>
  )
}
