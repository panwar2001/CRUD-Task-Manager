import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
interface InitialState{ 
    data:Array<{
        id:string,
        description:string,
        status:string,
        title:string
    }>,
    currentTask:Data
}; 
interface Data {
    id:string,
    description:string,
    status:string,
    title:string
}
const initialState:InitialState= {
    data:[ {
        id: "m5gr84i9",
        description: "hello ",
        status: "success",
        title: "ken99@yahoo.com",
      },
      {
        id: "3u1reuv4",
        description: "kdsfj ",
        status: "success",
        title: "Abe45@gmail.com",
      },
      {
        id: "derv1ws0",
        title: "Monserrat44@gmail.com",
        description: "kdfjdsf",
        status: "processing",
      }],
      currentTask: {
        id: "",
        description: "",
        status: "",
        title: "",
      },
}

export const imageSlice = createSlice({
  name: 'Data',
  initialState,
  reducers: { 
            updateData:(state:PayloadAction<Data>,action:PayloadAction<Data>)=>{
                const len=state.data.length;
                if(action.payload.id==""){
                    action.payload.id=uuidv4();
                   state.data=[action.payload,...state.data];
                   return;                
                }
                for(let i=0;i<len;i++){
                    if(state.data[i].id==action.payload.id){
                        //if id found then update task
                        state.data[i]={...state.data[i],...action.payload }
                        return;
                    }
                }
            },
            updateDelete:(state:PayloadAction<Data>,action:PayloadAction<Data>)=>{
            let index=-1;
            const len=state.data.length;
            for(let i=0;i<len;i++){
                if(action.payload==state.data[i].id){
                    index=i;
                    break;
                }
            }
            if(index>-1){
                state.data.splice(index,1);
            }
            },
            updateCurrentTask:(state:PayloadAction<Data>,action:PayloadAction<Data>)=>{
              const id=action.payload;
              if(id==""){
                return;
              }
              const len=state.data.length;
              for(let i=0;i<len;i++){
                if(state.data[i]['id']==id){
                   state.currentTask=state.data[i];
                   break;
                }
              }  
            },
            updateResetCurrentTask:(state:PayloadAction<Data>)=>{
                state.currentTask={
                    id: "",
                    description: "",
                    status: "",
                    title: "",
                  };
            },
    },
})

export const {updateDelete,updateData,updateCurrentTask,updateResetCurrentTask} = imageSlice.actions;
export default imageSlice.reducer;