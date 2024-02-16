// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { RootState } from "./store/store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./components/ui/textarea"
import { useDispatch,useSelector} from 'react-redux';
import { updateData,updateResetCurrentTask} from "./store/dataSlice"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function Edit({buttonText}) {
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">{buttonText}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>TASK BAR</DialogTitle>
            <DialogDescription>
            Make changes to your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm  setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>TASK BAR</DrawerTitle>
          <DrawerDescription>
            Make changes to your task here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm  setOpen={setOpen}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={()=>dispatch(updateResetCurrentTask())}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
const statusItems=["To do", "pending", "in progress", "blocked", "bug", "completed"];


const ProfileForm=({setOpen})=> {
  const dispatch=useDispatch();
  const [task,setTask]=useState(useSelector((state:RootState)=>state.Data.currentTask));
  const onSubmit=(e)=>{ 
    e.preventDefault();
    if(task.title.trim()==""){
      return;
    }
    dispatch(updateData(task));
    dispatch(updateResetCurrentTask());
    setOpen(false);
  }
  return (
    <form className={cn("grid items-start gap-4", "px-4")}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input defaultValue={task.title} onChange={(e)=>setTask({...task,title:e.target.value})} type="text" id="title" placeholder="Title..." required/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea defaultValue={task.description} onChange={(e)=>setTask({...task,description:e.target.value})} id="description" placeholder="Type your task here..." />
      </div>
      <div className="grid gap-2">
      <Label htmlFor="state">State</Label>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline">{task.status}
      <ChevronDown className="h-4 w-4" />
      </Button>
      </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={task.status} onValueChange={(value:string)=>setTask({...task,status:value})}>
              {statusItems.map(item=>{
              return <DropdownMenuRadioItem key={uuidv4()} value={item}>{item}</DropdownMenuRadioItem>
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>   
      </div>
      <Button type="submit" onClick={onSubmit}>Save changes</Button>
    </form>
  )
}
export default Edit;
