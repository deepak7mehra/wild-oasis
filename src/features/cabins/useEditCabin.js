import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin(){

    const queryClient = useQueryClient();

    const {mutate: editCabin, isLoading:isEditing} = useMutation({
        mutationFn: ({newCabinData,id}) => createEditCabin(newCabinData,id),
        onSuccess : ()=>{
          console.log("new cabin successfullt created");
          queryClient.invalidateQueries({queryKey:["cabins"]});
          reset();
        },
        onError: (err) =>{
          console.log(err)
          console.log("an error occured ")
        
        }
          
      });


    return {isEditing,editCabin};


}